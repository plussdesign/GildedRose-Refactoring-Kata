export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateBaseQuality = ({quality, sellIn}: { quality: Item['quality'], sellIn: Item['sellIn'] }, degradeFactor = 1) => {
    let newQuality = quality - degradeFactor
    if (sellIn <= 0) {
      newQuality = quality - (degradeFactor * 2)
    }

    if (newQuality <= 0) {
      return 0
    }

    if (newQuality >= 50) {
      return 50
    }

    return newQuality
  }

  updateAgedBrieQuality = ({quality, sellIn}: { quality: Item['quality'], sellIn: Item['sellIn'] }) => {
    return this.updateBaseQuality({quality, sellIn}, -1)
  }

  updateConjuredQuality = ({quality, sellIn}: { quality: Item['quality'], sellIn: Item['sellIn'] }) => {
    return this.updateBaseQuality({quality, sellIn}, 2)
  }

  updateBackstagePassesQuality = ({quality, sellIn}: { quality: Item['quality'], sellIn: Item['sellIn'] }) => {
    if (sellIn <= 0) {
      return 0
    }

    let newQuality = quality + 1

    if (sellIn <= 5) {
      newQuality = quality + 3
    } else if (sellIn <= 10) {
      newQuality = quality + 2
    }

    if (newQuality >= 50) {
      return 50
    }
    return newQuality
  }

  updateQuality() {

    return this.items.map((item) => {
      const {name, quality, sellIn} = item
      let qualityUpdate = quality
      let sellInUpdate = sellIn - 1
      switch (name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          qualityUpdate = this.updateBackstagePassesQuality({quality, sellIn});
          break;
        case 'Aged Brie':
          qualityUpdate = this.updateAgedBrieQuality({quality, sellIn});
          break;
        case 'Sulfuras, Hand of Ragnaros':
          sellInUpdate = sellIn
          break;
        case 'Conjured Mana Cake':
          qualityUpdate = this.updateConjuredQuality({quality, sellIn});
          break;
        default:
          qualityUpdate = this.updateBaseQuality({quality, sellIn});
      }

      item.quality = qualityUpdate
      item.sellIn = sellInUpdate
      return item
    })

  }

}
