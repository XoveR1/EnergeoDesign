import random

character_set = '+-.123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'

def generate_key():
    char_list = list(character_set)
    random.shuffle(char_list)
    return ''.join(char_list)

def generate_id():
    return 'e' + str(random.randrange(1,999999999))

def generate_cipher(input, key):
    cipher_text = ''
    for a in input:
        cipher_text += key[character_set.find(a)]
    return cipher_text

def hide_email(email_address):
    key = generate_key()
    id = generate_id()
    cipher_text = generate_cipher(email_address, key)

    script = """
    <script type="text/javascript">
        eval('var a="{key}"; ' +
        'var b=a.split("").sort().join(""); ' +
        'var c="{cipher_text}"; ' +
        'var d=""; for(var e=0;e<c.length;e++)d+=b.charAt(a.indexOf(c.charAt(e))); ' +
        'document.getElementById("{id}").innerHTML="<a href=\\\\"mailto:"+d+"\\\\">"+d+"</a>"')
    </script>
    """.format(key=key, cipher_text=cipher_text, id=id)
    return '<span id="{}">[javascript protected email address]</span>{}'.format(id, script)

def hide_phone(phone_number):
    key = generate_key()
    id = generate_id()
    cipher_text = generate_cipher(phone_number, key)

    regex = '\/^(\\\\d{3})(\\\\d{2})(\\\\d{3})(\\\\d{2})(\\\\d{2})$\/'
    script = """
    <script type="text/javascript">
        eval('var a="{key}"; ' +
        'var b=a.split("").sort().join(""); ' +
        'var c="{cipher_text}"; ' +
        'var d=""; for(var e=0;e<c.length;e++)d+=b.charAt(a.indexOf(c.charAt(e))); ' +
        'var p = d.replace(\/[^\\\\d]\/g, "", "").match({regex}); ' +
        'd = "(+"+p[1]+" "+p[2]+") "+p[3]+" "+p[4]+" "+p[5]; ' +
        'document.getElementById("{id}").innerHTML="<a href=\\\\"tel:"+d+"\\\\">"+d+"</a>"')
    </script>
    """.format(key=key, cipher_text=cipher_text, id=id, regex=regex)
    return '<span id="{}">[javascript protected phone number]</span>{}'.format(id, script)


print('energeo@inbox.ru: ')
print hide_email('energeo@inbox.ru')
print('(+375 17) 5 111 610: ')
print hide_phone('(+375 17) 5 111 610')
print('(+375 17) 5 111 611: ')
print hide_phone('(+375 17) 5 111 611')
print('(+375 29) 630 33 66: ')
print hide_phone('(+375 29) 630 33 66')
print('(+375 33) 630 33 66: ')
print hide_phone('(+375 33) 630 33 66')