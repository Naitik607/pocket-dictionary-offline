import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import  {Header} from 'react-native-elements'
import dictionary from './database'
 
export default class App extends React.Component {

  constructor(){
    super();
    this.state={
      wordSearched:'',
      wordReturned: '',
      defination:'', 
      isButtonPressed:'',
      lexicalCategory: '',
      }
  }
  getWord=(text)=>{ 
    var text = text.toLowerCase() 
    try{ 
      var word = dictionary[text]["word"]
       var lexicalCategory = dictionary[text]["lexicalCategory"] 
       var definition = dictionary[text]["definition"] 
       this.setState({ "word" : word, 
       "lexicalCategory" : lexicalCategory,
        "definition" : definition 
        }) 
        } 
        catch(err){ 
          alert("Sorry This word is not available for now")
           this.setState({ 
             'text':'', 
             'isSearchPressed':false 
             }) 
             } 
             }

  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor={'purple'}
      centerComponent={{text:'Pocket dictionary', style:{color:'white', fontSize:20, fontWeight:'bold'}}}
      />

     
      <TextInput style={{borderWidth:3, marginTop:80, textAlign:"center"}} 
      onChangeText = {text=>{
        this.setState({
         text:text,
         isSearchedPressed:false,
         word:"loading....",
         lexicalCategory:'',
         examples:[],
         defination:""
        })       
        }}
        value = {this.state.text}
      />
      
    <TouchableOpacity style={{
      backgroundColor:'white', 
      marginTop:10, 
      marginLeft:100,
      width:125,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      borderRadius: 15,  
      borderWidth: 2  
      
      }}
     onPress = {()=>{
       this.setState({isSearchedPressed:true})
       this.getWord(this.state.text)
    }}>
    <Text style={{fontWeight: 'bold'}}>Search</Text>
   </TouchableOpacity>
   <View>
   
     <Text style = {{fontSize: 20}}>
          {
            this.state.isSearchPressed && this.state.word === "loading...."
            ?(this.state.word)
            :("")
          }
     </Text>
     {
       this.state.word !== "loading...."
       ?(
         <View style={{justifyContent:'center', marginLeft:10 }}> 
         <View style={styles.detailsContainer}> 
         <Text style={styles.detailsTitle}>
          Word :{" "} 
          </Text> 
          <Text style={{fontSize:18 }}> 
          {this.state.word} 
          </Text>
           </View>
         <View style={styles.detailsContainer}> 
         <Text style={styles.detailsTitle}> 
         Type :{" "} 
         </Text> 
         <Text style={{fontSize:18}}> 
         {this.state.lexicalCategory} 
         </Text> 
         </View>
         <View style={{flexDirection:'row',flexWrap: 'wrap'}}> 
         <Text style={styles.detailsTitle}> Definition :{" "} </Text>
          <Text style={{ fontSize:18}}> {this.state.definition} </Text> 
          </View>
       </View>):null
     }
   </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailsTitle: {
    fontWeight: 'bold',
    color: "rgb(255,216,0)"
  }
});
