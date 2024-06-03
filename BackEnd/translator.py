from googletrans import Translator
import sys

def translator(source,dest,text):
    translator = Translator()
    #words = "what is your name"
    translated_text = translator.translate(text, src=source, dest=dest)
    if translated_text:
        return translated_text.text
    else:
        return "Translation failed."

print(translator(str(sys.argv[1]),str(sys.argv[2]),str(sys.argv[3])))
# print(translator(sys.argv[1],sys.argv[2],sys.argv[3]))