function isValid(s) {
  // N: length of s
  // filter out invalid characters, O(N)
  if (!/^([0-9()]*\s*(and|or)?\s*[0-9()]*)*$/i.test(s)) {
    return false
  }

  let idx = 0
  function parse(open) {
    let lastOp = null
    const stack = []
    while (idx < s.length) {
      switch (s[idx]) {
        case '(':
          idx += 1
          const item = parse(open + 1)
          if (typeof item !== 'number') {
            return null
          }
          stack.push(item)
          idx += 1
          break
        case 'o':
          idx += 2
          if (lastOp) {
            return null
          }
          lastOp = 'or'
          break
        case 'a':
          idx += 3
          if (lastOp) {
            return null
          }
          lastOp = 'and'
          break
        case ' ':
          idx += 1
          break
        case ')':
          if (open === 0 || lastOp) {
            return null
          }
          idx += 1
          return stack.reduce((acc, n) => acc + n, 0)
        default:
          let num = 0
          while (idx < s.length && /[0-9]/.test(s[idx])) {
            num = num * 10 + +s[idx++]
          }
          stack.push(num)
          if (lastOp) {
            if (stack.length < 2) {
              return null
            }
            stack.pop()
            stack.pop()
            stack.push(1)
            lastOp = null
          }
      }
    }
    if (open) {
      return null
    }
    if (lastOp && stack.length !== 2) {
      return null
    }
    return (lastOp && stack.length === 2) || stack.length <= 1
  }

  const r = parse(0)
  if (!r) {
    return false
  }
  return true
}

// true
console.log(isValid('23'))
console.log(isValid('(23)'))
console.log(isValid('23 or 23'))
console.log(isValid('23 and 23'))
console.log(isValid('(23 or 23)'))
console.log(isValid('23 or 23 and 23'))
console.log(isValid('23 and (23 or 23)'))
console.log(isValid('()'))
console.log(isValid(''))

console.log('==========')

// // false
console.log(isValid('23())'))
console.log(isValid('((2333)'))
console.log(isValid('('))
console.log(isValid('23 ann 23'))
console.log(isValid('23 oa 23'))
console.log(isValid('23 p 23'))
console.log(isValid('23 and'))
console.log(isValid('23 or'))
console.log(isValid('23 or and 23'))
console.log(isValid('and'))
console.log(isValid('or'))
console.log(isValid(']'))
