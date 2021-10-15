model = open("model.js","r")

str = model.read() + "\r\n"

auth = open("auth.js","r")

str += auth.read() + "\r\n"

view = open("view.js","r")

str += view.read() + "\r\n"

build = open("firebase-core.js","w")

build.write(str)

build.close()
model.close()
auth.close()
view.close()
print("Done")