import { View, ScrollView, Text } from "react-native";

import { Screen } from "../../components/Screen";

export default function About() {
  return (
    <Screen>
      <ScrollView>
        <View className="p-4">
          <Text className="text-white font-bold mb-8 text-2xl">
            Sobre el proyecto
          </Text>

          <Text className="text-white text-white/90 mb-4">
            "One Cat a Day" es una aplicación única que te ofrece lo que todos
            necesitamos para tener un buen día: ¡un gato gracioso al día! En un
            mundo lleno de estrés, ¿qué mejor que una dosis diaria de travesuras
            felinas?
          </Text>

          <Text className="text-white text-white/90 mb-4">
            Cada día, recibirás la foto de un gato diferente haciendo de las
            suyas, ya sea persiguiendo su propia cola, destruyendo tus muebles
            virtuales o simplemente mirándote como si supiera algo que tú no.
            Además, la app incluye insignias especiales como "gatuno primerizo"
            o "loca de los gatos" para premiar tu devoción diaria.
          </Text>

          <Text className="text-white text-white/90 mb-4">
            Esta aplicación fue creada pensando en todas esas personas que
            encuentran felicidad en los pequeños momentos y, claro, en los
            gatos. Creemos que los gatos no solo son adorables, sino que también
            son una fuente inagotable de diversión y caos controlado.
          </Text>

          <Text className="text-white text-white/90 mb-4">
            Nuestra misión es simple: hacerte sonreír todos los días, un gato a
            la vez. Además, puedes compartir tus gatos favoritos con amigos,
            presumir tus insignias y aprender curiosidades graciosas sobre las
            razas de gatos más peculiares.
          </Text>

          <Text className="text-white text-white/90 mb-4">
            Así que prepárate para convertirte en un amante oficial de los gatos
            con "One Cat a Day". Porque, seamos sinceros, un mundo sin gatos no
            sería tan divertido.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
