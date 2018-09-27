function a() { return [1, 2, 3] }
const x = a()
const y = a()
x.reverse()
x // 1,2,3
x.join() // 3,2,1 -- WTF?
y // 1,2,3
y.join() // 3,2,1 ???

// And reload the page, you will see more weird result
