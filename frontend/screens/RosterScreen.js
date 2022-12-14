
import { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import {  ListItem, Button } from '@rneui/themed'

// import { useSelector, useDispatch } from 'react-redux'
// import {logout, reset} from '../features/auth/authSlice'

/*************************************
 * Design for roster:
 * put add student under the flatlist
 * center logout
 ***********************************/


import { STUDENTS } from '../shared/students'

const  RosterScreen = ({navigation}) => {   

// const dispatch = useDispatch()
// const {user} = useSelector((state) => state.auth)   

// useEffect(() => {
//     if(!user){
//         navigation.navigate('Login')
//     }
// }, [user] )

const [students, setStudents ] = useState(STUDENTS)

const deleteStudent = () => {
    setStudents(students.filter((student)=> student.id !==id))
}

// const reload= () => window.location.reload();
 

//make sure page is refreshed when logged out
//if remember me is not checked log on should not be saved
const onLogout = () => {
    // dispatch(logout())
    // dispatch(reset())
    navigation.navigate('Login')
}

    const renderStudent = ({item: student}) => {
        return(
            <ListItem 
                onPress={() => 
                    navigation.navigate('Student', { student })
            }
            >  
            <ListItem.Content>
                <ListItem.Title>{student.name}</ListItem.Title>
            </ListItem.Content>     
            </ListItem>
        );
    };
    return(
        <>
          
        <View style={styles.container}>
              
            <FlatList
                data={students}
                renderItem={renderStudent}
                keyExtractor={(item) => item.id.toString()}
                />
                
           
        </View>
      
       <Button 
       title="Add New Student"
       icon={{
        name:'plus',
        type:'font-awesome',
        size: 15,
        color:'steelblue'  
       }}
       onPress={ ()=>
        navigation.navigate("Add New Student")
    }
       />
            

        <Button
            containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
            }}
            title="Logout"
            icon={{
                name:'sign-out',
                type:'font-awesome',
                size:15,
                color: 'steelblue'
            }}
            type="clear"
            titleStyle={{color: 'steelblue'}}
            onPress={() => onLogout()}
            />

       
        </>
  
    )    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 20
    }, 
    centeredView: {
        flex: 1,
        justifyContent: "center",
      
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        
      },
      
      buttonClose: {
        backgroundColor: "steelblue",
      },
      textStyle: {
        color: "steelblue",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },

})

export default RosterScreen