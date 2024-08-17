import numpy as np
import pandas as pd
import re
import string
import nltk
from nltk import PorterStemmer
import pickle

vocab = pd.read_csv('static/Model/vocabulary.txt',header=None)
tokens = vocab[0].tolist()

with open('static/Model/corpora/stopwords/english','r') as file:
    sw = file.read().splitlines()

with open('static/Model/model.pickle','rb') as f:
    model = pickle.load(f)

ps = PorterStemmer()    

def preprocessing(text):
    data = pd.DataFrame([text],columns=['tweet'])
    
    data["tweet"] = data["tweet"].apply(lambda x:" ".join(x.lower() for x in x.split()))
    data["tweet"] = data["tweet"].apply(lambda x:" ".join(re.sub(r'^https?:\/\/.*[\r\n]*','',x,flags=re.MULTILINE) for x in x.split()))
    data["tweet"] = data["tweet"].apply(removePunctuations)
    data["tweet"] = data["tweet"].str.replace(r'\d+','',regex=True)
    data['tweet'] = data['tweet'].apply(lambda x:" ".join(x for x in x.split() if x not in sw))
    data['tweet'] = data['tweet'].apply(lambda x :' '.join(ps.stem(x) for x in x.split()))

    return data['tweet']

def removePunctuations(text):
    for punctuation in string.punctuation:
        text = text.replace(punctuation,'')
    return text  

def vectorizer(ds):
    vectorized_list = []

    for sentence in ds :
        sentence_list = np.zeros(len(tokens))

        for i in range(len(tokens)):
            if tokens[i] in sentence.split():
                sentence_list[i] = 1

        vectorized_list.append(sentence_list)

    return np.asarray(vectorized_list,dtype=np.float32) 

def predict(text):
    result = model.predict(text)
    if result == 0 :
        return "Positive"
    else:
        return "Negative"