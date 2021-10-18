modules = ["model.js", "auth.js", "crud.js", "view.js", "html.js", "run.js"]

str = ""
for m in modules:
    file = open(m,"r")
    str += file.read() + "\r\n"
    file.close()

build = open("firebase-core.js","w")
build.write(str)
build.close()

print("Done")