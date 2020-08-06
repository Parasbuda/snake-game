import React, { Component } from 'react'
import Snake from "./Component/Snake"
import Food from "./Component/Food"



const getRandomNumber=()=>{
  let min=1
  let max=98
  let x=Math.floor((Math.random()*(max-min+1)+min)/2)*2
  let y=Math.floor((Math.random()*(max-min+1)+min)/2)*2
  return [x,y]
}

const initialState={
  snakedots:[[0,0],[2,0],[4,0]],
  fooddot:getRandomNumber(),
  direction:"RIGHT",
  speed:200
}
 class App extends Component {
   state=initialState

   componentDidMount(){
     setInterval(this.moveSnake,this.state.speed)
     document.onkeydown=this.KeyDown
   }

   componentDidUpdate(){
     this.moveSnakeInsideTheBorder()
     
     this.snakeEatItself()
     this.snakeEatFood()
     
   }

   KeyDown=(e)=>{
    e=e||window.event
    switch(e.keyCode){
      case 37:
        this.setState({direction:"LEFT"})
        break
        case 38:
          this.setState({direction:"UP"})
          break
          case 39:
            this.setState({direction:"RIGHT"})
            break
            case 40:
              this.setState({direction:"DOWN"})
              break
    }
   }

   moveSnake=()=>{
     let dots=[...this.state.snakedots]
     let head=dots[dots.length-1]
     switch(this.state.direction){
       case "RIGHT":
         head=[head[0]+2,head[1]]
         break
         case "LEFT":
           head=[head[0]-2,head[1]]
           break
           case "UP":
             head=[head[0],head[1]-2]
             break
             case "DOWN":
               head=[head[0],head[1]+2]

     }
      dots.push(head)
      dots.shift()
      this.setState({
        snakedots:dots
      })
   }


   moveSnakeInsideTheBorder(){
     let head=this.state.snakedots[this.state.snakedots.length-1]
     if(head[0]>=100||head[1]>=100||head[0]<0||head[1]<0)
     {
       this.gameOver()
     }
   }


   snakeEatFood(){
     
     let head=this.state.snakedots[this.state.snakedots.length-1]
     let food=this.state.fooddot
     if(head[0]== food[0] && head[1]==food[1])
     {
       this.setState({
         fooddot:getRandomNumber()
       })
      this.enlargeSnake()
      this.increaseSpeed()

     }
   }

   snakeEatItself(){
     let eat=[...this.state.snakedots]
     let head=eat[eat.length-1]
     eat.pop()
       eat.forEach(dot=>{
         if(head[0]==dot[0] && head[1]==dot[1])
         {
           this.gameOver()
         }
       })
     

   }

   enlargeSnake(){
     let newSnake=[...this.state.snakedots]
     newSnake.unshift([])
     this.setState({
       snakedots:newSnake
     }
     )
   }

   increaseSpeed(){
     if(this.state.speed>10){
       this.setState({
         speed:this.state.speed-10
       })
     }
   }

   gameOver(){
     alert(`Game Over, The Snake Length is ${this.state.snakedots.length}`)
     this.setState(initialState)
   }
   
  render() {
    return (
      <div className="game-area">
        <Snake snakedots={this.state.snakedots}/>
        <Food fooddot={this.state.fooddot}/>
      </div>
    )
  }
}

export default App
