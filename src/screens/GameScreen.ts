import Container = Phaser.GameObjects.Container
import { HeaderContainer } from '../Components/HeaderContainer'
import { MenuScreen } from './MenuScreen'
import { menuConfig } from '../configs/menuConfig'
import { GameStates, MenuStates } from '../enums/MenuStates'
import { PuzzleScreen } from './PuzzleScreen'
import Phaser from 'phaser'

export class GameScreen extends Container {
  private header: HeaderContainer
  private menuScreen: MenuScreen
  public currentState: GameStates
  private puzzleScreen: PuzzleScreen
  private whiteScreen: Phaser.GameObjects.Sprite
  constructor(scene) {
    super(scene)
    this.initialize()
  }

  private initialize(): void {
    this.initHeader()
    this.initMenuScreen()
    this.crateWhiteScreen()
  }

  private initHeader(): void {
    const header = new HeaderContainer(this.scene)
    header.setPosition(header.width / 2, header.height / 2)
    header.on('onBackBtnClick', this.handleBackBtnClick, this)
    this.add((this.header = header))
  }

  private initMenuScreen(): void {
    this.menuScreen = new MenuScreen(this.scene, this.header, menuConfig)
    this.currentState = GameStates.MenuState
    this.menuScreen.setPosition(0, this.header.height - 20)
    this.menuScreen.on('playBtnClicked', this.initPuzzleScreen, this)
    this.add(this.menuScreen)
    // const gr = this.scene.add.graphics()
    // gr.fillStyle(0x000fff, 0.1)
    // gr.fillRect(0, 0, this.menuScreen.width, this.menuScreen.height)
    // this.menuScreen.add(gr)
    // this.menuScreen.header = this.header
  }

  private initPuzzleScreen(gameConfig): void {
    console.log('hasa', !this.puzzleScreen)
    if (!this.puzzleScreen) {
      console.log('init')
      this.puzzleScreen = new PuzzleScreen(this.scene, this.header, gameConfig)
      this.currentState = GameStates.GameState
      this.add(this.puzzleScreen)
    } else {
      console.log('show')
      this.puzzleScreen.setToInitialState()
      this.currentState = GameStates.GameState
      this.puzzleScreen.setVisible(true)
    }
    this.bringToTop(this.whiteScreen)
    // this.puzzleScreen.on('onPuzzleScreenHideComplete', () => {
    //   this.menuScreen.showLevelsView()
    //   // this.puzzleScreen.hideWhiteScreen()
    // })
  }

  private handleBackBtnClick(): void {
    console.log(this.currentState)
    if (this.currentState === GameStates.MenuState) {
      switch (this.menuScreen.getCurrentState()) {
        case MenuStates.CategoriesState: {
          console.log('CategoriesState')
          break
        }
        case MenuStates.SubcategoryState: {
          console.log('SubcategoryState')
          this.menuScreen.hideSubcategoriesView()
          break
        }
        case MenuStates.LevelsState: {
          console.log('LevelsState')
          this.menuScreen.hideLevelsView(true)
          break
        }
      }
    } else {
      this.currentState = GameStates.MenuState
      this.hidePuzzleView()
      // this.hideWhiteScreen()
      // this.puzzleScreen.hideGame()
    }
    console.log('handleBackBtnClicked')
  }

  public hidePuzzleView(): void {
    const tw = this.showWhiteScreenTween()
    tw.on('complete', () => {
      this.puzzleScreen.setVisible(false)
      this.menuScreen.showLevelsView(this.whiteScreen)
    })
  }

  public hideWhiteScreen(): Phaser.Tweens.Tween {
    return this.scene.add.tween({
      targets: this.whiteScreen,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.whiteScreen.setVisible(false)
      }
    })
  }

  private showWhiteScreenTween(): Phaser.Tweens.Tween {
    return this.scene.add.tween({
      targets: this.whiteScreen,
      alpha: 1,
      duration: 500,
      onStart: () => {
        this.whiteScreen.setVisible(true)
      }
    })
  }

  private crateWhiteScreen(): void {
    this.whiteScreen = this.scene.add.sprite(1920 / 2, 1080 / 2, 'whiteScreen')
    this.whiteScreen.setAlpha(0)
    this.whiteScreen.setVisible(false)
    this.add(this.whiteScreen)
  }
}
