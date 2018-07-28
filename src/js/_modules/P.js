
console.log('from module P')
export default class P{
   constructor(name){
     this.name =name
   }
   getName(){
     console.log(this.name)
   }
}
