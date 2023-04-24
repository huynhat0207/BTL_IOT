<View style={styles.container}>
      <Image
        style = {styles.logo} 
        source = {logo} />
      <Text style = {
        { 
          fontSize : 28,
          fontWeight : 'bold',
          marginTop : '45%',
          marginBottom : '25%'
        }
      }>
        Let Make Your House
      </Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('./login.js')}>
        <Text style={styles.text}>Get started !</Text>
      </Pressable>
      <StatusBar style ="auto" />
    </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width : 250,
    height : 250,
  },
  button: {
    backgroundColor: '#3f6ff0',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius : 15,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});