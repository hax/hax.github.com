# Raw string literal for Stage 1
--------------------------------------------------------
<div><ruby>贺师俊<rp>（</rp><rt>HE Shi-Jun</rt><rp>）</rp></ruby> @hax <small>Feb 2024 TC39</small></div>

## Problem

```javascript
console.log(String.raw`
  Template literals can cross multiple lines,
  and contain unescaped backslash "\", so you
  can just write "\n", no need to double escape
  it to "\\n".
`)
```

But, `` ` ``

```javascript
let query = `
    select * 
    from \`users\` 
    where \`name\` = ?
`
```

Even worse if using
`String.raw`

```javascript
let sql = String.raw`
    select * 
    from ${"`"}table${"`"} 
    where ${"`"}name${"`"} = ?
`
```

Unescape backtick
manually

```javascript
let sql = String.raw`
    select * 
    from \`users\` 
    where \`name\` = ?
`.replaceAll("\\`", "`")
```

```javascript
let sql = String.raw`
    select * 
    from 🤡users🤡 
    where 🤡name🤡 = ?
`.replaceAll("🤡", "`")
```

Not good
Need convert the text everytime

JS in JS

```javascript
let name = "hax"
let generatedCode = `
    let name = ${JSON.stringify(name)}
    console.log(\`Hello $\{name}\`)
`
```

Not only `` ` ``
But also `${`

```javascript
let name = "hax"
let generatedCode = `
    let name = ${JSON.stringify(name)}
    console.log(\`Hello $\{name}\`)
`
```

```javascript
let name = "hax"
let generatedCode = `
    let name = ${JSON.stringify(name)}
    console.log(\`Hello ${name}\`)
`
```

Example of a LLM prompt

````javascript
let promptForLLM = `
You are a AI assistant to give advice to programmers,
for example, given the code:
\`\`\`js
let s1 = "This is a\\n"
  + "string across\\n"
  + "multiple lines.\\n"
let a = 1, b = 2
let s2 = "a + b = " + (a + b)
\`\`\`
you would output the advice:
\`\`\`\`markdown
## Advice
It's more readable to use template literal to replace
the string concatenation.

## Original code
\`\`\`js
let s1 = "This is a\\n"
  + "string across\\n"
  + "multiple lines.\\n"
let a = 1, b = 2
let s2 = "a + b = " + (a + b)
\`\`\`

## Improved code
\`\`\`js
let s1 = String.dedent\`
  This is a
  string across
  multiple lines
  \`
let a = 1, b = 2
let s2 = \`a + b = \${a + b}\`
\`\`\`
\`\`\`\`
`
````

Use External File?
- Separation between text and source code
- No interpolation, requiring a third-party template
- Diff File API in diff platforms
- Require file I/O and colored as async

## Motivation

JS lacks raw literal that can contain any arbitrary text
Prevents containing other languages (eg. JS itself) and text formats (eg. Markdown)

## Core Goals

1. Raw literal allow *all* string values without escape
2. Support interpolations
3. Support tag functions

## Other Requirements
4. Indentation
5. Easy to migrate
6. Info string for tools
7. Comments
8. Enable escaping in specified place
9. Easy to nest

## Possible Solution
- @sken130's draft (see repo)
- here document
- Swift/Rust style

```swift
let query = #`
    select * 
    from `users`
    where `name` = ?
`#
```

```swift
let name = "hax"
let generatedCode = #`
    let name = $#{JSON.stringify(name)}
    console.log(`Hello ${name}`)
`#
```


Plan to investigate different syntax options
if the proposal approved as stage 1
Will discuss syntax design in future meetings


Discussion

- Do the motivation sufficiant for syntax?
- Do we agree with the goals?
- If that, I will ask stage 1
- Plan to go back next meeting for details
