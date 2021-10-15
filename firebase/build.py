file1 = open("model.js","r")

str = file1.read() + "\r\n"

file2 = open("auth.js","r")

str += file2.read() + "\r\n"

build = open("firebase-core.js","w")

build.write(str)

build.close()
file2.close()
file1.close()
print("Done")