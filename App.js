import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text,
         TextInput, View, Button,ScrollView} from 'react-native';
import {supabase} from './conexao'


export default function App() {
  const [placaDigitada, setPlacaDigitada] = useState("");
  const [anoDigitado, setAnoDigitado] = useState("");
  const [modeloDigitado, setModeloDigitado] = useState("");
  const [dados, setDados] = useState([]);

  //Função para consultar os veículos
  const consultarVeiculos = async() => {
      const {data, error} = await supabase.from("tb_veiculos")
      .select("*")
      if(error){ alert("Falha ao consultar! "+error.message)}
      else{
        setDados(data)
      }
  }
  useEffect(()=>{
    consultarVeiculos()
  },[])

  //Função para cadastrar veículo
  const cadastrarVeiculo = async() =>{
      const {error} = await supabase.from("tb_veiculos")
      .insert({coluna_placa: placaDigitada, 
               coluna_modelo: modeloDigitado,
               coluna_ano: anoDigitado})
      if(error){
          alert("Falha ao cadastrar!"+error.message)
      }else{
          alert("Cadastrado com sucesso!")
          consultarVeiculos() 
      }
  }

  return (
    <View style={estilos.container}>
      <Text style={{fontSize: 20}}>Cadastro de Veículos</Text>
      <TextInput
          onChangeText={(texto)=>setPlacaDigitada(texto)}
          placeholder='Digite a placa'
          style={estilos.caixaTexto} />
      <TextInput
          onChangeText={(texto)=>setModeloDigitado(texto)}
          placeholder='Digite o modelo'
          style={estilos.caixaTexto} />
      <TextInput
          onChangeText={(texto)=>setAnoDigitado(texto)}
          placeholder='Digite o ano'
          style={estilos.caixaTexto} />
      <Button
      title="Cadastrar"
      onPress={()=>cadastrarVeiculo()} />

      <ScrollView>
        {dados.map((item)=>(
            <View style={estilos.cxVeiculos}>
                <Text> PLACA: {item.coluna_placa}   </Text>
                <Text> MODELO: {item.coluna_modelo} </Text>
                <Text> ANO: {item.coluna_ano}       </Text>
            </View>
         )      
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const estilos = StyleSheet.create({
  cxVeiculos:{
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
    padding: 10
  },
  caixaTexto:{
    borderWidth: 1,
    borderColor: "#c5c5c56",
    padding: 4,
    borderRadius: 4,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
