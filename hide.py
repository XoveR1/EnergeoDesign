import random


def hide_email(email_address):
    character_set = '+-.123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
    char_list = list(character_set)
    random.shuffle(char_list)

    key = ''.join(char_list)

    cipher_text = ''
    id = 'e' + str(random.randrange(1,999999999))

    for a in email_address:
        cipher_text += key[character_set.find(a)]

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

def hide_phone(email_address):
    character_set = '+-.0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'
    char_list = list(character_set)
    random.shuffle(char_list)

    key = ''.join(char_list)

    cipher_text = ''
    id = 'e' + str(random.randrange(1,999999999))

    for a in email_address:
        cipher_text += key[character_set.find(a)]

    script = """
    <script type="text/javascript">
        eval('var a="{key}"; ' +
        'var b=a.split("").sort().join(""); ' +
        'var c="{cipher_text}"; ' +
        'var d=""; for(var e=0;e<c.length;e++)d+=b.charAt(a.indexOf(c.charAt(e))); ' +
        'p = d.replace(/[^\d]/g, "").match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/)' +
        'd = "(+"+p[1]+" "+p[2]+") "+p[3]+" "+p[4]+" "+p[5]' +
        'document.getElementById("{id}").innerHTML="<a href=\\\\"tel:"+d+"\\\\">"+d+"</a>"')
    </script>
    """.format(key=key, cipher_text=cipher_text, id=id)
    return '<span id="{}">[javascript protected phone number]</span>{}'.format(id, script)

print hide_email('energeo@inbox.ru')
print hide_phone('(+375 29) 630 33 66')