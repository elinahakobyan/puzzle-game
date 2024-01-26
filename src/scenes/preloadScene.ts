export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('bkg', 'assets/img/bkg.jpg')
    this.load.image('car', 'assets/img/car.png')
    this.load.image('next-btn', 'assets/buttons/next-btn.png')
    this.load.image('hint-btn', 'assets/buttons/hint-btn.png')
    this.load.image('back-btn', 'assets/buttons/back-btn.png')
    this.load.image('next-icon', 'assets/icons/next-icon.png')
    this.load.image('hint-icon', 'assets/icons/hint-icon.png')
    this.load.image('play-icon', 'assets/icons/play-icon.png')

    let categories = ['animals', 'birds', 'professions', 'sport', 'vehicles'].forEach(key => {
      this.load.image(key, `assets/categories/${key}.png`)
    })
    let animals = ['elephant', 'giraffe', 'lion', 'monkey', 'zebra'].forEach(key => {
      this.load.image(key, `assets/subcategories/animals/${key}.png`)
    })
    let birds = ['flamingo', 'hen', 'owl', 'parrot', 'swan'].forEach(key => {
      this.load.image(key, `assets/subcategories/birds/${key}.png`)
    })
    let professions = ['builder', 'doctor', 'judge', 'programmer', 'teacher'].forEach(key => {
      this.load.image(key, `assets/subcategories/professions/${key}.png`)
    })
    let sport = ['basketball', 'chess', 'football', 'swiming', 'volleyball'].forEach(key => {
      this.load.image(key, `assets/subcategories/sport/${key}.png`)
    })
    let vehicles = ['bicycle', 'car', 'plane', 'train', 'traktor'].forEach(key => {
      this.load.image(key, `assets/subcategories/vehicles/${key}.png`)
    })
  }

  create() {
    const h = window.innerHeight
    const w = window.innerWidth
    // if (w > h) {
    // } else {
    //   console.warn('PORTRAIT')
    // }
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
