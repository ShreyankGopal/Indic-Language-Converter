from googletrans import Translator
import sys

def translator(source, dest, text):
    translator = Translator()
    translated = translator.translate(text, src=source, dest=dest)
    return translated.text  # Return the translated text

if len(sys.argv) >= 4:
    source_lang = sys.argv[1]
    dest_lang = sys.argv[2]
    text_to_translate = sys.argv[3]
    print(translator(source_lang, dest_lang, text_to_translate))
else:
    print("Please provide source language, destination language, and text to translate.")

