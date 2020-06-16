import React from 'react';
import { Link } from 'react-router-dom';
const style={
    margin:20,
    textAlign:"center",
    fontSize:20
}
const img={
    width:300,
    height:300
}
export default class App extends React.Component{
    constructor(){
        super()
        this.state={
            list:[["/3","3X3.png",'3X3'],["/4","4X4.png",'4X4'],["/5","5X5.png",'5X5']]
        }
    }
    changer(){
        if (window.innerWidth>1000){
            this.setState({list:[["/3","3X3.png",'3X3'],["/4","4X4.png",'4X4'],["/5","5X5.png",'5X5']]})
        }else{
            this.setState({list:[["/3","3X3.png",'3X3']]})
        }
    }
    componentDidMount(){
        window.addEventListener('resize',this.changer())
    }
    render(){

        return (
                    <div className='index' style={{}}>
                        {this.state.list.map(e=><Link key={e[0]} to={e[0]}>
                            <div style={style}>
                                <img src={e[1]} alt="img" style={img}/>
                                <div>{e[2]}</div>
                            </div>
                        </Link>)}
                    </div>
        )
    }
}