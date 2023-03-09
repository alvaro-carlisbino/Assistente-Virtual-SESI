import speech_recognition as sr
import os
import datetime
import pyttsx3

# Inicializa o objeto da biblioteca pyttsx3
engine = pyttsx3.init()

# Define a velocidade de fala
rate = engine.getProperty('rate')
engine.setProperty('rate', rate - 50)

# Define a voz a ser utilizada
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

# cria um reconhecedor de voz
r = sr.Recognizer()

# define o microfone como fonte de áudio
with sr.Microphone() as source:
    print("Diga alguma coisa!")
    # escuta o que o usuário diz
    audio = r.listen(source)

# usa o reconhecedor de voz do Google para transcrever o áudio em texto
try:
    print("Você disse: " + r.recognize_google(audio, language='pt-BR'))
    # executa o comando apropriado com base no que o usuário disse
    if 'horario' in r.recognize_google(audio, language='pt-BR'):
        now = datetime.datetime.now()
        engine.say("Horário atual:", now.strftime("%H:%M:%S"))
        engine.runAndWait()
except sr.UnknownValueError:
    print("Não entendi o que você disse.")
except sr.RequestError as e:
    print("Não foi possível realizar a transcrição: {0}".format(e))
