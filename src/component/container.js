import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [[null,null,null],[null,2,null],[null,null,null]],
            key:[[1,2,3],[4,5,6],[7,8,9]],
            win:false,
            lose:false
        }
    }
    componentDidMount(){
        this.setList(this.props.match.params.id)
    }
    setList=(num)=>{
        let count = 0
        let keyarray=[]
        let array=[]
        for (let i=0;i<num;i++){
            array.push([])
            keyarray.push([])
            for (let z=num;z>0;z--){
                count++
                array[i].push(null)
                keyarray[i].push(count)
            }
        }
        
        let num1=Math.floor(Math.random() * array.length)
        let num2= Math.floor(Math.random() * array.length)
        var num3=Math.floor(Math.random() * array.length)
        let num4= Math.floor(Math.random() * array.length)
        while (num1===num3){
            
         num3=Math.floor(Math.random() * array.length)

        }
        array[num1][num2]=2
        array[num3][num4]=2
        // array=[[2,4,8],[16,32,64],[128,256,512]]
        this.setState({list:array,key:keyarray})
    }
    wholeCountOfNull = () => {
        let count = 0;
        this.state.list.map(e => e.map(e => e === null ? count++ : e))
        return count
    }
    returnchoices=(array)=>{
        let choice=array.map(e=>e.filter(e=>e!==null))
        let list=[]
        for (let i of choice){
            for (let j of i){
                if(!list.includes(j) && j<8){
                list.push(j)
                }
            }
        }
        if (!list.includes(2)){
            list.push(2)
        }
        return list
    }
    rendomnewElement = (array) => {
        let l = Math.floor((Math.random() * this.wholeCountOfNull() + 1));
        let choice=this.returnchoices(array)
        let li = array
        let ncount = 0
        for (let i in li) {
            for (let j in li[i]) {
                if (li[i][j] === null) {
                    ncount++
                    if (ncount === l) {
                        li[i][j] = choice[Math.floor((Math.random() * choice.length))]
                        break
                    }
                }
            }
        }
        return li
    }


    addFromLeft = (array) => {
        for (let i in array) {
            if (array[i - 1] === array[i]) {
                array.splice(i - 1, 2, array[i - 1] + array[i])
                i++
            }
        }
        return array
    }
    addFromRight = (array) => {
        for (let i = array.length - 1; i > -1; i--) {
            if (array[i] === array[i + 1]) {
                array.splice(i, 2, array[i] + array[i + 1])
                i--
            }
        }
        return array
    }

    removeNull = (array) => {
        while (array.includes(null)) {
            array.splice(array.indexOf(null), 1)
        }
        return array
    }
    pushFromLeft = (array) => {
        while (array.length !== this.state.list.length) {
            array.splice(0, 0, null)
        }
        return array
    }
    pushFromRight = (array) => {
        while (array.length !== this.state.list.length) {
            array.splice(array.length, 0, null)
        }
        return array
    }
    right = () => {
        this.setState({
            list: this.rendomnewElement(this.state.list.map(e => {
               
                    return this.pushFromLeft(this.addFromRight(this.removeNull(e)))
        
            }))
        })

    }
    left = () => {
        this.setState({
            list: this.rendomnewElement(this.state.list.map(e => {
                    return this.pushFromRight(this.addFromLeft(this.removeNull(e)))
            }))
        })

    }
    transforse = (array) => {
        let t = []
        for (let z=this.state.list.length;z>0;z--){
            t.push([])
        }
        for (let i in array) {
            for (let j in array) {
                t[i][j] = array[j][i]
            }
        }
        return t
    }
    down = () => {
        this.setState({
            list: this.rendomnewElement(this.transforse(this.transforse(this.state.list).map(e => {

                return this.pushFromLeft(this.addFromRight(this.removeNull(e)))

            })))
        })

    }
    up = () => {
        this.setState({
            list: this.rendomnewElement(this.transforse(this.transforse(this.state.list).map(e => {
              
                    return this.pushFromRight(this.addFromLeft(this.removeNull(e)))
             
            })))
        })

    }
  
    
    win=()=>{
        if (!this.state.win){
            this.setState({win:true})
        }
    }
    lose=()=>{
        if (!this.state.lose){
            this.setState({lose:true})
        }
    }
    selectingCss=(value)=>{
        if (value===2048){
            this.win()
        }
        const box ={
            backgroundColor:"green",
            fontSize:30,
            width:80,
            height:80,
            textAlign:"center",
            marginTop:5,
            marginRight:5,
            lineHeight:2.5,
            color:"black"
        }

        if (value===2){
            box.backgroundColor=  "#ff9900"
        }else if(value===4){
            box.backgroundColor="#3399ff"
        }else if (value === 8){
            box.backgroundColor="#ffff66"
        }else if (value === 16){
            box.color="white"
            box.backgroundColor="#ff0000"
        }else if (value === 32){
            box.backgroundColor="#ff66ff"
        }else if (value === 64){
            box.backgroundColor="white"
        }else if (value === 128){
            box.backgroundColor="greenyellow"
        }else if (value === 256){
            box.backgroundColor="lightgreen"
        }else if (value === 512){
            box.backgroundColor="skyblue"    
        }else if (value === 1024){
            box.backgroundColor="gold"
        }else if (value === 2048){
            box.backgroundColor="black"
            box.color="white"

        }
        return box
    }
    addFromLeftChance = (array) => {
        let item = false
        for (let j in array){
            for (let i in array) {

                if (array[j][i - 1]===undefined){
                
                }
                else{
                    if (array[j][i - 1] === array[j][i]) {
                        i++
                        return true
                    }
                }
            }
        }
        return item
    }
    addFromRightChance = (array) => {
        let item=false
        for (let j =array.length-1;j>-1;j--){
            for (let i = array.length - 1; i > -1; i--) {
            if (array[j][i+1]===undefined){

            }else{
                if (array[j][i]=== array[j][i+1]) {
                        i--
                       return true
                    }
                }
            }
        }
        return item
    }
    chance=(array)=>{
        return this.addFromLeftChance(array)||this.addFromRightChance(array)||this.addFromLeftChance(this.transforse(array))||this.addFromRightChance(this.transforse(array))
    }
    lafunc=()=>{
        let count =this.wholeCountOfNull(this.state.list)
        if (count===0 && !this.chance(this.state.list)){
            this.lose()
        }
    }

    render() {
        this.lafunc()
        const main ={
            backgroundColor: "grey",
            
        }
        const secMain ={
            marginTop: 40,
 
        }
        const Styles = {
            marginTop: 20,
            backgroundColor:"black",
            textAlign: "center",
            height: 155,
            color: "white"
        }
        const button1 = {
            marginTop: 10,
            height: 40,
            width: 90,
            backgroundColor: "blue",
            fontSize: 20,
            color: "white"
        }
        const button2 = {
            marginRight: 10,
            height: 40,
            width: 90,
            backgroundColor: "blue",
            fontSize:20,
            color:"white"
        }
        const button3 = {
            marginRight: 10,
            height: 40,
            width: 90,
            fontSize:20,
            color:"white",
            backgroundColor: "blue"
        }
        const button4 = {
            marginRight: 10,
            height: 40,
            width: 90,
            fontSize:20,
            color:"white",
            backgroundColor: "blue"
        }
        return (
            <div style={main}><br />
            {this.state.win?<div className="win">You Won</div>:
            this.state.lose?<div className="lose">You Lose</div>:

                <div  style={secMain}>
                {this.state.list.map((value,index )=> <Grid container justify="center" key={index}>
                    {value.map((value,secondindex) => (
                        <Grid item key={this.state.key[index][secondindex]} >
                            <Paper style={this.selectingCss(value)} key={this.state.key[index][secondindex]} >{value}</Paper>
                        </Grid>
                    ))}</Grid>)}
                    </div>}
                    <br />
                <div style={Styles}><br />
                    <button onClick={e => this.up()} style={button1} >up</button><br /><br />
                    <button onClick={e => this.left()} style={button3} >left</button>
                    <button onClick={e => this.down()} style={button2} >down</button>
                    <button onClick={e => this.right()} style={button4} >right</button>
                </div>
            </div>)
    }
}

export default App;