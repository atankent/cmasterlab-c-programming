// CMasterLab — Comprehensive C Programming Curriculum, Quizzes, Challenges & Memory Traces

const C_UNITS = {
  basics: {
    id: 'basics',
    tag: 'UNIT 1 • C FUNDAMENTALS & CONTROL FLOW',
    title: 'Variables, Format Specifiers & Control Structures',
    desc: 'Master the core building blocks of ANSI C (C99/C11): primitive data types, printf/scanf format specifiers, integer division vs type casting, and loop control.',
    heroFilename: 'unit1_control_flow.c',
    heroCode: `#include <stdio.h>

int main(void) {
    int n = 5, factorial = 1;
    for (int i = 1; i <= n; i++) {
        factorial *= i;
    }
    printf("%d! = %d\\n", n, factorial);
    return 0;
}`,
    modules: [
      {
        id: 'u1_m1',
        num: 'Module 1.1',
        title: 'Data Types, sizeof & printf/scanf Specifiers',
        summary: 'Understand stack sizes of int, float, double, char, and how format specifiers (%d, %f, %c, %zu) interpret raw bytes.',
        xp: 30,
        filename: 'types_io.c',
        explanation: `
          <p>In C, every variable has a fixed static type that determines how many bytes of memory it occupies and how the CPU interprets those bits.</p>
          <h4>Key Format Specifiers</h4>
          <ul>
            <li><code>%d</code> or <code>%i</code> — Signed 32-bit integer (<code>int</code>, typically 4 bytes)</li>
            <li><code>%u</code> — Unsigned integer (<code>unsigned int</code>)</li>
            <li><code>%f</code> — Floating-point (<code>float</code> in <code>printf</code>; use <code>%lf</code> for <code>double</code> in <code>scanf</code>)</li>
            <li><code>%c</code> — Single ASCII character (<code>char</code>, 1 byte)</li>
            <li><code>%zu</code> — Size type returned by the <code>sizeof</code> operator (<code>size_t</code>)</li>
          </ul>
          <h4>The <code>scanf</code> Address Rule</h4>
          <p>Always pass the memory address of a primitive variable using the address-of operator <code>&amp;</code> in <code>scanf("%d", &amp;age)</code> so <code>scanf</code> knows where in RAM to store the user's input.</p>
        `,
        code: `#include <stdio.h>

int main(void) {
    int score = 95;
    double gpa = 3.875;
    char grade = 'A';

    printf("Score : %d (size: %zu bytes)\\n", score, sizeof(score));
    printf("GPA   : %.2f (size: %zu bytes)\\n", gpa, sizeof(gpa));
    printf("Grade : %c (ASCII code: %d)\\n", grade, grade);
    return 0;
}`,
        output: `Score : 95 (size: 4 bytes)
GPA   : 3.88 (size: 8 bytes)
Grade : A (ASCII code: 65)`,
        instructorNote: 'Emphasize to students that characters in C are just 1-byte integers under the hood (ASCII). Printing a char with %d reveals its ASCII integer value (e.g., \'A\' is 65). Also highlight forgetting & in scanf as the #1 cause of segmentation faults in Week 1.'
      },
      {
        id: 'u1_m2',
        num: 'Module 1.2',
        title: 'Operators, Integer Division & Bitwise Logic',
        summary: 'Avoid the classic integer division truncation trap, understand pre/post increment (++i vs i++), and bitwise operations.',
        xp: 30,
        filename: 'operators.c',
        explanation: `
          <p>C evaluates arithmetic expressions strictly according to operand types. When both operands of <code>/</code> are integers, C performs <strong>integer division</strong> and truncates any fractional part toward zero.</p>
          <h4>Essential Operator Rules</h4>
          <ul>
            <li><strong>Integer Division Trap:</strong> <code>5 / 2</code> evaluates to <code>2</code>, even if assigned to a <code>float</code>! Use explicit casting <code>(double)a / b</code> or a float literal <code>5.0 / 2</code>.</li>
            <li><strong>Modulo Operator (<code>%</code>):</strong> Returns the remainder of integer division (<code>17 % 5 == 2</code>).</li>
            <li><strong>Short-Circuit Logic:</strong> In <code>A &amp;&amp; B</code>, if <code>A</code> is false (<code>0</code>), <code>B</code> is never evaluated.</li>
            <li><strong>Bitwise AND/OR/XOR:</strong> <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code> manipulate individual bits.</li>
          </ul>
        `,
        code: `#include <stdio.h>

int main(void) {
    int a = 7, b = 2;
    double wrong_avg = a / b;           // 7 / 2 = 3 -> 3.00
    double right_avg = (double)a / b;   // 7.0 / 2 = 3.50

    printf("Truncated : %.2f\\n", wrong_avg);
    printf("Exact     : %.2f\\n", right_avg);
    printf("Bitwise   : 1 << 3 = %d\\n", 1 << 3);
    return 0;
}`,
        output: `Truncated : 3.00
Exact     : 3.50
Bitwise   : 1 << 3 = 8`,
        instructorNote: 'Show students why `double x = 7 / 2;` still produces `3.00`: the division `7 / 2` happens BEFORE assignment to `x`. Explicit casting `(double)a` promotes the operand prior to division.'
      },
      {
        id: 'u1_m3',
        num: 'Module 1.3',
        title: 'Branching (if/switch) & Loops (for/while)',
        summary: 'Control program execution flow with conditionals, switch fallthrough rules, and definite vs indefinite loops.',
        xp: 30,
        filename: 'loops_branching.c',
        explanation: `
          <p>In C, any non-zero value is considered <strong>true</strong>, and <code>0</code> is considered <strong>false</strong>.</p>
          <h4>Common Control Flow Traps</h4>
          <ul>
            <li><strong>Assignment vs Equality:</strong> Writing <code>if (x = 5)</code> assigns <code>5</code> to <code>x</code> and always evaluates to true! Always use <code>if (x == 5)</code>.</li>
            <li><strong>Switch Fallthrough:</strong> Without a <code>break;</code> statement, execution falls through into the next <code>case</code> block.</li>
            <li><strong>Loop Control:</strong> <code>break</code> exits the loop immediately; <code>continue</code> skips the rest of the current iteration and jumps to the loop update step.</li>
          </ul>
        `,
        code: `#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 6; i++) {
        if (i % 2 == 0) {
            continue; // Skip even numbers
        }
        sum += i;
    }
    printf("Sum of odd numbers (1..6) = %d\\n", sum);
    return 0;
}`,
        output: `Sum of odd numbers (1..6) = 9`,
        instructorNote: 'Remind students to compile with `-Wall -Wextra` so GCC warns them if they accidentally write `if (x = 5)` instead of `if (x == 5)`.'
      }
    ],
    quizzes: [
      {
        id: 'q_u1_1',
        type: 'output',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'What will the following C program print to standard output?',
        filename: 'div_cast.c',
        code: `#include <stdio.h>

int main(void) {
    int x = 9, y = 4;
    double result = x / y + 0.5;
    printf("%.1f\\n", result);
    return 0;
}`,
        options: ['2.8', '2.5', '2.0', '3.0'],
        correct: 1,
        hint: 'Evaluate x / y first as two integers before adding 0.5.',
        explanation: 'Because both `x` (9) and `y` (4) are `int`, `9 / 4` performs integer division and yields `2`. Then `2 + 0.5` evaluates to `2.5`.'
      },
      {
        id: 'q_u1_2',
        type: 'bug',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'Why does this C snippet always print "Access Granted", even when `pin` is initialized to 0?',
        filename: 'bug_if.c',
        code: `#include <stdio.h>

int main(void) {
    int pin = 0;
    if (pin = 1234) {
        printf("Access Granted\\n");
    } else {
        printf("Access Denied\\n");
    }
    return 0;
}`,
        options: [
          'It uses the assignment operator (=) instead of equality (==)',
          'pin must be declared as unsigned int',
          'printf cannot be called inside an if block',
          '1234 overflows a standard 32-bit int'
        ],
        correct: 0,
        hint: 'Look closely at the operator inside `if (pin = 1234)`.',
        explanation: '`pin = 1234` assigns 1234 to `pin` and evaluates to `1234`, which is non-zero (true in C). It should be `if (pin == 1234)`.'
      },
      {
        id: 'q_u1_3',
        type: 'output',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'What is the output of this post-increment and pre-increment expression?',
        filename: 'inc_order.c',
        code: `#include <stdio.h>

int main(void) {
    int a = 5;
    int b = a++;
    int c = ++a;
    printf("%d %d %d\\n", a, b, c);
    return 0;
}`,
        options: ['7 5 7', '7 6 7', '6 5 6', '7 5 6'],
        correct: 0,
        hint: '`b = a++` uses the old value of `a` (5) then increments `a` to 6. Next, `c = ++a` increments `a` to 7 first.',
        explanation: '`b = a++` sets `b = 5` and `a = 6`. Then `c = ++a` increments `a` to `7` and assigns `c = 7`. Final values: `a=7, b=5, c=7`.'
      },
      {
        id: 'q_u1_4',
        type: 'output',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'What does this `switch` statement print when `code = 2`?',
        filename: 'switch_fall.c',
        code: `#include <stdio.h>

int main(void) {
    int code = 2;
    switch (code) {
        case 1: printf("One "); break;
        case 2: printf("Two ");
        case 3: printf("Three "); break;
        default: printf("Other");
    }
    return 0;
}`,
        options: ['Two ', 'Two Three ', 'Two Three Other', 'Three '],
        correct: 1,
        hint: 'Notice whether `case 2:` has a `break;` statement.',
        explanation: 'Because `case 2:` is missing a `break;` statement, execution prints `"Two "` and falls through into `case 3:`, printing `"Three "` before hitting `break;`.'
      },
      {
        id: 'q_u1_5',
        type: 'concept',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'Which format specifier is required by the C99/C11 standard to print a `size_t` value returned by `sizeof()`?',
        filename: 'sizeof_spec.c',
        code: `printf("Size of int: ???\\n", sizeof(int));`,
        options: ['%zu', '%d', '%f', '%p'],
        correct: 0,
        hint: '`sizeof` returns an unsigned `size_t` integer.',
        explanation: '`%zu` is the standard C99/C11 specifier for `size_t`. Using `%d` causes a compiler type mismatch warning on 64-bit systems.'
      }
    ],
    trace: {
      filename: 'loop_factorial_trace.c',
      lines: [
        'int main(void) {',
        '    int n = 4;',
        '    int fact = 1;',
        '    for (int i = 1; i <= n; i++) {',
        '        fact = fact * i;',
        '    }',
        '    printf("Result: %d\\n", fact);',
        '    return 0;',
        '}'
      ],
      steps: [
        {
          line: 2,
          explanation: 'Allocate 4 bytes on the Stack at address 0x7ffe00 for integer `n` and initialize it to 4.',
          stdout: '',
          memory: [
            { addr: '0x7ffe00', name: 'int n', val: '4', type: 'stack', changed: true }
          ]
        },
        {
          line: 3,
          explanation: 'Allocate 4 bytes on the Stack at 0x7ffe04 for accumulator `fact` and initialize it to 1.',
          stdout: '',
          memory: [
            { addr: '0x7ffe00', name: 'int n', val: '4', type: 'stack', changed: false },
            { addr: '0x7ffe04', name: 'int fact', val: '1', type: 'stack', changed: true }
          ]
        },
        {
          line: 5,
          explanation: 'Iteration i = 1: Check (1 <= 4) is true. Multiply `fact` (1) * `i` (1) = 1.',
          stdout: '',
          memory: [
            { addr: '0x7ffe00', name: 'int n', val: '4', type: 'stack', changed: false },
            { addr: '0x7ffe04', name: 'int fact', val: '1', type: 'stack', changed: true },
            { addr: '0x7ffe08', name: 'int i', val: '1', type: 'stack', changed: true }
          ]
        },
        {
          line: 5,
          explanation: 'Iteration i = 2: Check (2 <= 4) is true. Update `fact` = 1 * 2 = 2.',
          stdout: '',
          memory: [
            { addr: '0x7ffe00', name: 'int n', val: '4', type: 'stack', changed: false },
            { addr: '0x7ffe04', name: 'int fact', val: '2', type: 'stack', changed: true },
            { addr: '0x7ffe08', name: 'int i', val: '2', type: 'stack', changed: true }
          ]
        },
        {
          line: 5,
          explanation: 'Iterations i = 3 and i = 4 complete: `fact` becomes 2 * 3 = 6, then 6 * 4 = 24.',
          stdout: '',
          memory: [
            { addr: '0x7ffe00', name: 'int n', val: '4', type: 'stack', changed: false },
            { addr: '0x7ffe04', name: 'int fact', val: '24', type: 'stack', changed: true },
            { addr: '0x7ffe08', name: 'int i', val: '4', type: 'stack', changed: true }
          ]
        },
        {
          line: 7,
          explanation: 'Loop terminates when i reaches 5 (5 <= 4 is false). `printf` sends "Result: 24" to stdout.',
          stdout: 'Result: 24\n',
          memory: [
            { addr: '0x7ffe00', name: 'int n', val: '4', type: 'stack', changed: false },
            { addr: '0x7ffe04', name: 'int fact', val: '24', type: 'stack', changed: false }
          ]
        }
      ]
    }
  },

  arrays: {
    id: 'arrays',
    tag: 'UNIT 2 • FUNCTIONS, ARRAYS & C STRINGS',
    title: 'Modular Functions, Contiguous Arrays & Null-Terminated Strings',
    desc: 'Learn how C passes arguments by value, stores 1D/2D arrays in contiguous memory blocks, and represents strings using a trailing null byte (\\0).',
    heroFilename: 'unit2_arrays.c',
    heroCode: `#include <stdio.h>

int sum_array(const int arr[], int size) {
    int total = 0;
    for (int i = 0; i < size; i++) {
        total += arr[i];
    }
    return total;
}`,
    modules: [
      {
        id: 'u2_m1',
        num: 'Module 2.1',
        title: 'Functions, Prototypes & Pass-by-Value',
        summary: 'Structure C programs with function declarations, stack frames, and understand why local parameter changes do not affect the caller.',
        xp: 35,
        filename: 'functions_scope.c',
        explanation: `
          <p>In C, all function arguments are passed <strong>by value</strong>. When you call a function, C copies the argument's value into a new local parameter variable on the function's stack frame.</p>
          <h4>Key Function Rules</h4>
          <ul>
            <li><strong>Function Prototype:</strong> Declare the function signature before <code>main()</code> (or in a <code>.h</code> header file) so the compiler can type-check calls.</li>
            <li><strong>Pass-by-Value Isolation:</strong> Modifying a parameter inside a function only modifies the local copy unless you pass a pointer.</li>
            <li><strong>Local Variable Lifetime:</strong> Local variables live on the Stack and are destroyed automatically when the function returns.</li>
          </ul>
        `,
        code: `#include <stdio.h>

// Function prototype
int square(int x);

int main(void) {
    int num = 6;
    printf("num before: %d\\n", num);
    printf("square(num): %d\\n", square(num));
    printf("num after : %d\\n", num);
    return 0;
}

int square(int x) {
    x = x * x; // Modifies local copy only
    return x;
}`,
        output: `num before: 6
square(num): 36
num after : 6`,
        instructorNote: 'Draw two separate stack frames for `main()` and `square()`. Having a variable named `x` in both functions is a great way to prove they occupy completely different RAM addresses.'
      },
      {
        id: 'u2_m2',
        num: 'Module 2.2',
        title: '1D & 2D Arrays and Bounds Safety',
        summary: 'Explore contiguous indexing from 0 to N-1, array decay when passed to functions, and why C does not check array bounds.',
        xp: 35,
        filename: 'arrays_bounds.c',
        explanation: `
          <p>An array in C is a contiguous block of memory holding elements of the same type. For <code>int arr[4]</code>, valid indices are <code>0, 1, 2, 3</code>.</p>
          <h4>Critical Array Properties</h4>
          <ul>
            <li><strong>Zero-Based Contiguous RAM:</strong> If <code>arr[0]</code> is at address <code>0x1000</code> and <code>sizeof(int) == 4</code>, then <code>arr[1]</code> is at <code>0x1004</code>, <code>arr[2]</code> at <code>0x1008</code>, etc.</li>
            <li><strong>No Bounds Checking:</strong> Accessing <code>arr[4]</code> or <code>arr[-1]</code> triggers <strong>Undefined Behavior (UB)</strong> and corrupts adjacent stack memory.</li>
            <li><strong>Passing Arrays to Functions:</strong> Arrays decay into a pointer to their first element when passed to a function, so you must always pass the array's <code>size</code> as a separate parameter!</li>
          </ul>
        `,
        code: `#include <stdio.h>

int main(void) {
    int scores[4] = {78, 85, 92, 99};
    size_t len = sizeof(scores) / sizeof(scores[0]);

    for (size_t i = 0; i < len; i++) {
        printf("scores[%zu] = %d (addr: %p)\\n",
               i, scores[i], (void*)&scores[i]);
    }
    return 0;
}`,
        output: `scores[0] = 78 (addr: 0x7ffd40)
scores[1] = 85 (addr: 0x7ffd44)
scores[2] = 92 (addr: 0x7ffd48)
scores[3] = 99 (addr: 0x7ffd4c)`,
        instructorNote: 'Point out the hexadecimal addresses in the output: `40, 44, 48, 4c` — each element increases by exactly 4 bytes (`sizeof(int)`). Also warn students that `sizeof(arr) / sizeof(arr[0])` ONLY works in the scope where the array was declared, not inside a function parameter!'
      },
      {
        id: 'u2_m3',
        num: 'Module 2.3',
        title: 'Null-Terminated C Strings & <string.h>',
        summary: 'Understand how C stores strings as char arrays ending with \'\\0\', and use strlen, strcmp, and strncpy safely.',
        xp: 35,
        filename: 'c_strings.c',
        explanation: `
          <p>Unlike Java or Python, C has no built-in string object. A C string is simply a character array terminated by the <strong>null character <code>'\\0'</code></strong> (ASCII value <code>0</code>).</p>
          <h4>String Memory &amp; Standard Library</h4>
          <ul>
            <li><strong>The +1 Byte Rule:</strong> Storing <code>"HELLO"</code> (5 letters) requires an array of size <strong>at least 6</strong>: <code>{'H','E','L','L','O','\\0'}</code>.</li>
            <li><code>strlen(s)</code> — Counts characters up to (but excluding) <code>'\\0'</code>.</li>
            <li><code>strcmp(s1, s2)</code> — Returns <code>0</code> if two strings have identical characters! Never compare strings using <code>s1 == s2</code> (that compares memory addresses).</li>
          </ul>
        `,
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char word[] = "CODE";
    printf("String : %s\\n", word);
    printf("strlen : %zu characters\\n", strlen(word));
    printf("sizeof : %zu bytes in RAM (includes '\\\\0')\\n", sizeof(word));

    if (strcmp(word, "CODE") == 0) {
        printf("Strings match!\\n");
    }
    return 0;
}`,
        output: `String : CODE
strlen : 4 characters
sizeof : 5 bytes in RAM (includes '\\0')
Strings match!`,
        instructorNote: 'The contrast between `strlen("CODE") == 4` and `sizeof("CODE") == 5` is a classic exam question that cements the concept of the invisible null terminator `\\0`.'
      }
    ],
    quizzes: [
      {
        id: 'q_u2_1',
        type: 'concept',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'What is the minimum `char` array size required to safely store the C string `"Compiler"`?',
        filename: 'str_size.c',
        code: `char title[???] = "Compiler";`,
        options: ['9 bytes', '8 bytes', '7 bytes', '16 bytes'],
        correct: 0,
        hint: 'Count the 8 letters in "Compiler" and remember the null terminator byte.',
        explanation: `"Compiler" has 8 visible characters plus 1 mandatory null terminator ('\\0'), requiring 9 bytes in total.`
      },
      {
        id: 'q_u2_2',
        type: 'output',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'What will this program print to standard output?',
        filename: 'pass_by_val.c',
        code: `#include <stdio.h>

void boost(int val) {
    val += 50;
}

int main(void) {
    int hp = 100;
    boost(hp);
    printf("%d\\n", hp);
    return 0;
}`,
        options: ['100', '150', '50', '0'],
        correct: 0,
        hint: 'Remember how C passes primitive integers to functions.',
        explanation: 'C passes arguments by value. `boost(hp)` receives a copy of `100` in its local variable `val`. The original `hp` in `main` remains `100`.'
      },
      {
        id: 'q_u2_3',
        type: 'output',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'What does `strlen(msg)` return after executing line 5?',
        filename: 'null_byte.c',
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char msg[] = "Hello World";
    msg[5] = '\\0';
    printf("%s (%zu)\\n", msg, strlen(msg));
    return 0;
}`,
        options: ['Hello (5)', 'Hello World (11)', 'Hello (11)', 'Hello  (6)'],
        correct: 0,
        hint: '`strlen` and `printf("%s")` stop as soon as they encounter the first `\\0` byte.',
        explanation: 'Index 5 was the space character. Overwriting `msg[5]` with `\'\\0\'` terminates the string right after `"Hello"`, so `printf` prints `Hello` and `strlen` returns `5`.'
      },
      {
        id: 'q_u2_4',
        type: 'bug',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'Identify the bug in this loop that sums a 5-element integer array:',
        filename: 'off_by_one.c',
        code: `int nums[5] = {10, 20, 30, 40, 50};
int total = 0;
for (int i = 0; i <= 5; i++) {
    total += nums[i];
}`,
        options: [
          'Off-by-one error: `i <= 5` reads out-of-bounds index `nums[5]`',
          'Arrays in C are 1-indexed so `i` must start at 1',
          '`total` is not initialized properly',
          'Initializer lists `{10, 20, ...}` are illegal in C'
        ],
        correct: 0,
        hint: 'What are the valid indices of an array of length 5?',
        explanation: 'For `int nums[5]`, valid indices are `0, 1, 2, 3, 4`. Using `i <= 5` accesses `nums[5]`, which is out-of-bounds memory (Undefined Behavior).'
      },
      {
        id: 'q_u2_5',
        type: 'concept',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'How do you properly check if two C strings `str1` and `str2` contain identical text?',
        filename: 'strcmp_check.c',
        code: `char str1[] = "C99";\nchar str2[] = "C99";`,
        options: [
          'if (strcmp(str1, str2) == 0)',
          'if (str1 == str2)',
          'if (str1.equals(str2))',
          'if (strlen(str1) == strlen(str2))'
        ],
        correct: 0,
        hint: '`str1 == str2` only compares the base memory addresses of the two arrays.',
        explanation: '`strcmp(str1, str2)` compares characters one by one and returns `0` when both strings are lexicographically equal.'
      }
    ],
    trace: {
      filename: 'array_string_trace.c',
      lines: [
        'int main(void) {',
        '    int arr[3] = {10, 20, 30};',
        '    char s[4] = "Hi!";',
        '    arr[1] = arr[0] + arr[2];',
        '    s[2] = \'\\0\';',
        '    printf("%d %s\\n", arr[1], s);',
        '    return 0;',
        '}'
      ],
      steps: [
        {
          line: 2,
          explanation: 'Allocate 3 contiguous 4-byte integers on the Stack (`arr[0]` at 0x7ffd10, `arr[1]` at 0x7ffd14, `arr[2]` at 0x7ffd18).',
          stdout: '',
          memory: [
            { addr: '0x7ffd10', name: 'arr[0]', val: '10', type: 'stack', changed: true },
            { addr: '0x7ffd14', name: 'arr[1]', val: '20', type: 'stack', changed: true },
            { addr: '0x7ffd18', name: 'arr[2]', val: '30', type: 'stack', changed: true }
          ]
        },
        {
          line: 3,
          explanation: 'Allocate 4 contiguous 1-byte chars for `s`: `\'H\'`, `\'i\'`, `\'!\'`, and null terminator `\'\\0\'`.',
          stdout: '',
          memory: [
            { addr: '0x7ffd10', name: 'arr[0..2]', val: '{10, 20, 30}', type: 'stack', changed: false },
            { addr: '0x7ffd20', name: 's[0..3]', val: "{'H','i','!','\\0'}", type: 'stack', changed: true }
          ]
        },
        {
          line: 4,
          explanation: 'Read `arr[0]` (10) and `arr[2]` (30), sum to 40, and write 40 into `arr[1]` at address 0x7ffd14.',
          stdout: '',
          memory: [
            { addr: '0x7ffd10', name: 'arr[0]', val: '10', type: 'stack', changed: false },
            { addr: '0x7ffd14', name: 'arr[1]', val: '40', type: 'stack', changed: true },
            { addr: '0x7ffd18', name: 'arr[2]', val: '30', type: 'stack', changed: false },
            { addr: '0x7ffd20', name: 's[0..3]', val: "{'H','i','!','\\0'}", type: 'stack', changed: false }
          ]
        },
        {
          line: 5,
          explanation: 'Overwrite `s[2]` (`\'!\'`) with `\'\\0\'`. The string now terminates after `"Hi"`.',
          stdout: '',
          memory: [
            { addr: '0x7ffd14', name: 'arr[1]', val: '40', type: 'stack', changed: false },
            { addr: '0x7ffd20', name: 's[0..3]', val: "{'H','i','\\0','\\0'}", type: 'stack', changed: true }
          ]
        },
        {
          line: 6,
          explanation: '`printf` outputs `arr[1]` (40) and reads `s` up to the first `\'\\0\'` ("Hi").',
          stdout: '40 Hi\n',
          memory: [
            { addr: '0x7ffd14', name: 'arr[1]', val: '40', type: 'stack', changed: false },
            { addr: '0x7ffd20', name: 's[0..3]', val: "{'H','i','\\0','\\0'}", type: 'stack', changed: false }
          ]
        }
      ]
    }
  },

  pointers: {
    id: 'pointers',
    tag: 'UNIT 3 • POINTERS & DYNAMIC MEMORY',
    title: 'Memory Addresses (&), Dereferencing (*), Pointer Arithmetic & Heap',
    desc: 'Unlock C’s greatest superpower: direct memory manipulation via pointers, call-by-reference, array-pointer duality, and dynamic allocation with malloc/free.',
    heroFilename: 'unit3_pointers.c',
    heroCode: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
    modules: [
      {
        id: 'u3_m1',
        num: 'Module 3.1',
        title: 'Pointers: Address-of (&) and Dereference (*)',
        summary: 'Demystify pointer declarations, storing hexadecimal memory addresses, and indirect reading/writing via *ptr.',
        xp: 40,
        filename: 'pointer_basics.c',
        explanation: `
          <p>A <strong>pointer</strong> is a variable whose value is the <strong>memory address</strong> of another variable.</p>
          <h4>Two Essential Operators</h4>
          <ul>
            <li><code>&amp;x</code> (<strong>Address-of</strong>): Returns the memory address where variable <code>x</code> lives in RAM.</li>
            <li><code>*ptr</code> (<strong>Dereference / Indirection</strong>): Follows the address stored inside <code>ptr</code> to read or modify the target variable at that address.</li>
            <li><strong>Always Initialize Pointers:</strong> An uninitialized pointer ("wild pointer") holds garbage and causes crashes. Initialize unused pointers to <code>NULL</code>.</li>
          </ul>
        `,
        code: `#include <stdio.h>

int main(void) {
    int count = 42;
    int *ptr = &count; // ptr holds address of count

    printf("count value : %d\\n", count);
    printf("count addr  : %p\\n", (void*)ptr);

    *ptr = 100; // Modify count indirectly through ptr!
    printf("count after *ptr = 100: %d\\n", count);
    return 0;
}`,
        output: `count value : 42
count addr  : 0x7ffe24
count after *ptr = 100: 100`,
        instructorNote: 'Use the "Mailbox Analogy": `0x7ffe24` is the street address written on a sticky note (`ptr`), while `42` is the letter inside that mailbox (`*ptr`).'
      },
      {
        id: 'u3_m2',
        num: 'Module 3.2',
        title: 'Pointer Arithmetic & Array-Pointer Duality',
        summary: 'See why *(arr + i) is identical to arr[i], and how adding 1 to an int* advances the address by sizeof(int) bytes.',
        xp: 40,
        filename: 'ptr_arithmetic.c',
        explanation: `
          <p>In C, an array name like <code>arr</code> evaluates to the address of its first element (<code>&amp;arr[0]</code>).</p>
          <h4>Pointer Scaling Rule</h4>
          <ul>
            <li>When you compute <code>ptr + 1</code> on an <code>int *ptr</code>, the CPU does <strong>not</strong> add 1 byte—it adds <code>1 * sizeof(int)</code> (4 bytes) so it points cleanly to the next integer in the array!</li>
            <li><strong>Equivalence Law:</strong> The compiler rewrites <code>arr[i]</code> directly into <code>*(arr + i)</code>.</li>
          </ul>
        `,
        code: `#include <stdio.h>

int main(void) {
    int data[3] = {100, 200, 300};
    int *p = data; // Same as &data[0]

    printf("*p       = %d\\n", *p);
    printf("*(p + 1) = %d\\n", *(p + 1));
    printf("*(p + 2) = %d\\n", *(p + 2));
    return 0;
}`,
        output: `*p       = 100
*(p + 1) = 200
*(p + 2) = 300`,
        instructorNote: 'Ask students: If `p` is an `int*` at address `0x1000` (where `sizeof(int) == 4`), what address is `p + 3`? Answer: `0x1000 + 3 * 4 = 0x100C` (12 bytes higher).'
      },
      {
        id: 'u3_m3',
        num: 'Module 3.3',
        title: 'Dynamic Memory on the Heap (malloc, calloc, free)',
        summary: 'Allocate runtime-sized arrays on the Heap using <stdlib.h>, check for NULL, and prevent memory leaks with free().',
        xp: 40,
        filename: 'heap_malloc.c',
        explanation: `
          <p>Stack variables disappear when a function returns. To allocate memory whose size is determined at runtime or that persists across functions, use the <strong>Heap</strong> via <code>&lt;stdlib.h&gt;</code>.</p>
          <h4>Heap Lifecycle Rules</h4>
          <ul>
            <li><code>malloc(n * sizeof(int))</code> — Allocates raw uninitialized bytes on the Heap and returns a pointer (or <code>NULL</code> if out of memory).</li>
            <li><code>calloc(n, sizeof(int))</code> — Allocates and zero-initializes the memory.</li>
            <li><code>free(ptr)</code> — Releases Heap memory back to the OS. Forgetting <code>free()</code> causes a <strong>Memory Leak</strong>; using memory after <code>free()</code> is a <strong>Use-After-Free</strong> bug.</li>
          </ul>
        `,
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 4;
    int *arr = malloc(n * sizeof(int));
    if (arr == NULL) return 1;

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    printf("Heap arr[2] = %d\\n", arr[2]);

    free(arr);   // Always free heap memory!
    arr = NULL;  // Prevent dangling pointer
    return 0;
}`,
        output: `Heap arr[2] = 30`,
        instructorNote: 'Teach the Golden Rule of C Heap management: Every single `malloc` or `calloc` must have a matching `free`, and setting `ptr = NULL` right after `free(ptr)` prevents dangling pointer bugs.'
      }
    ],
    quizzes: [
      {
        id: 'q_u3_1',
        type: 'output',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'What will the following pointer manipulation code print?',
        filename: 'ptr_trace.c',
        code: `#include <stdio.h>

int main(void) {
    int x = 10, y = 20;
    int *p = &x;
    *p = 35;
    p = &y;
    *p = *p + x;
    printf("%d %d\\n", x, y);
    return 0;
}`,
        options: ['35 55', '10 30', '35 20', '55 35'],
        correct: 0,
        hint: 'First `p` points to `x`, changing `x` to 35. Then `p` is redirected to `y`.',
        explanation: '`*p = 35` sets `x = 35`. Next, `p = &y` points `p` at `y` (20). Finally, `*p = *p + x` sets `y = 20 + 35 = 55`. Output: `35 55`.'
      },
      {
        id: 'q_u3_2',
        type: 'concept',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'Assume `sizeof(int)` is 4 bytes. If `int *ptr` holds address `0x2000`, what address does `ptr + 3` evaluate to?',
        filename: 'ptr_math.c',
        code: `int *ptr = (int*)0x2000;\nint *next = ptr + 3;`,
        options: ['0x200C (12 bytes higher)', '0x2003 (3 bytes higher)', '0x2004 (4 bytes higher)', '0x2030 (48 bytes higher)'],
        correct: 0,
        hint: 'Pointer arithmetic scales by `sizeof(*ptr)` = 4 bytes.',
        explanation: 'Adding 3 to an `int*` advances the address by `3 * sizeof(int) = 3 * 4 = 12` bytes (`0xC` in hexadecimal), yielding `0x200C`.'
      },
      {
        id: 'q_u3_3',
        type: 'bug',
        difficulty: 'Hard • +60 XP',
        xp: 60,
        prompt: 'What critical memory bug is present in this function?',
        filename: 'dangling_stack.c',
        code: `int* create_number(void) {
    int local_val = 99;
    return &local_val;
}`,
        options: [
          'Returning the address of a local Stack variable (dangling pointer)',
          'Syntax error: functions cannot return int* in C',
          'Memory leak: local_val was not freed',
          '99 is too large for an int'
        ],
        correct: 0,
        hint: 'What happens to `local_val` the moment `create_number()` returns?',
        explanation: '`local_val` lives on `create_number`’s Stack frame, which is reclaimed as soon as the function returns. Returning `&local_val` produces a dangling pointer!'
      },
      {
        id: 'q_u3_4',
        type: 'output',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'What does this array-pointer expression print?',
        filename: 'arr_ptr.c',
        code: `#include <stdio.h>

int main(void) {
    int v[] = {5, 15, 25, 35};
    int *p = &v[1];
    printf("%d %d\\n", *p, *(p + 2));
    return 0;
}`,
        options: ['15 35', '5 25', '15 25', '5 15'],
        correct: 0,
        hint: '`p` starts at `v[1]` (which is 15). Where is `p + 2`?',
        explanation: '`p` points to `v[1]` (`15`). Therefore `p + 2` points to `v[1 + 2] = v[3]` (`35`).'
      },
      {
        id: 'q_u3_5',
        type: 'concept',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'Which standard library function must be called to release memory allocated by `malloc()` or `calloc()`?',
        filename: 'heap_release.c',
        code: `int *buf = malloc(100 * sizeof(int));\n// ... use buf ...\n???(buf);`,
        options: ['free(buf)', 'delete buf', 'dealloc(buf)', 'remove(buf)'],
        correct: 0,
        hint: '`delete` is C++; C uses a 4-letter function from `<stdlib.h>`.',
        explanation: 'In C, `free(ptr)` releases dynamically allocated Heap memory back to the system.'
      }
    ],
    trace: {
      filename: 'pointer_swap_trace.c',
      lines: [
        'int main(void) {',
        '    int a = 10, b = 99;',
        '    int *pa = &a;',
        '    int *pb = &b;',
        '    int temp = *pa;',
        '    *pa = *pb;',
        '    *pb = temp;',
        '    printf("a=%d, b=%d\\n", a, b);',
        '}'
      ],
      steps: [
        {
          line: 2,
          explanation: 'Allocate `a = 10` at 0x7ffe10 and `b = 99` at 0x7ffe14 on the Stack.',
          stdout: '',
          memory: [
            { addr: '0x7ffe10', name: 'int a', val: '10', type: 'stack', changed: true },
            { addr: '0x7ffe14', name: 'int b', val: '99', type: 'stack', changed: true }
          ]
        },
        {
          line: 3,
          explanation: 'Create pointer `pa` at 0x7ffe20 storing the address of `a` (`0x7ffe10`).',
          stdout: '',
          memory: [
            { addr: '0x7ffe10', name: 'int a', val: '10', type: 'stack', changed: false },
            { addr: '0x7ffe14', name: 'int b', val: '99', type: 'stack', changed: false },
            { addr: '0x7ffe20', name: 'int *pa', val: '0x7ffe10 (→ a)', type: 'pointer', changed: true }
          ]
        },
        {
          line: 4,
          explanation: 'Create pointer `pb` at 0x7ffe28 storing the address of `b` (`0x7ffe14`).',
          stdout: '',
          memory: [
            { addr: '0x7ffe10', name: 'int a', val: '10', type: 'stack', changed: false },
            { addr: '0x7ffe14', name: 'int b', val: '99', type: 'stack', changed: false },
            { addr: '0x7ffe20', name: 'int *pa', val: '0x7ffe10 (→ a)', type: 'pointer', changed: false },
            { addr: '0x7ffe28', name: 'int *pb', val: '0x7ffe14 (→ b)', type: 'pointer', changed: true }
          ]
        },
        {
          line: 5,
          explanation: 'Dereference `*pa` (reads 10 from 0x7ffe10) and save it in `temp`.',
          stdout: '',
          memory: [
            { addr: '0x7ffe10', name: 'int a', val: '10', type: 'stack', changed: false },
            { addr: '0x7ffe14', name: 'int b', val: '99', type: 'stack', changed: false },
            { addr: '0x7ffe20', name: 'int *pa', val: '0x7ffe10 (→ a)', type: 'pointer', changed: false },
            { addr: '0x7ffe28', name: 'int *pb', val: '0x7ffe14 (→ b)', type: 'pointer', changed: false },
            { addr: '0x7ffe30', name: 'int temp', val: '10', type: 'stack', changed: true }
          ]
        },
        {
          line: 6,
          explanation: 'Dereference `*pb` (99) and write it into `*pa` (address 0x7ffe10). Variable `a` becomes 99!',
          stdout: '',
          memory: [
            { addr: '0x7ffe10', name: 'int a', val: '99', type: 'stack', changed: true },
            { addr: '0x7ffe14', name: 'int b', val: '99', type: 'stack', changed: false },
            { addr: '0x7ffe30', name: 'int temp', val: '10', type: 'stack', changed: false }
          ]
        },
        {
          line: 8,
          explanation: 'Write `temp` (10) into `*pb` (0x7ffe14, so `b` becomes 10) and print the swapped values.',
          stdout: 'a=99, b=10\n',
          memory: [
            { addr: '0x7ffe10', name: 'int a', val: '99', type: 'stack', changed: false },
            { addr: '0x7ffe14', name: 'int b', val: '10', type: 'stack', changed: true },
            { addr: '0x7ffe30', name: 'int temp', val: '10', type: 'stack', changed: false }
          ]
        }
      ]
    }
  },

  structs: {
    id: 'structs',
    tag: 'UNIT 4 • STRUCTS, TYPEDEF & FILE I/O',
    title: 'Custom Data Structures (struct), Arrow Operator (->) & File Streams',
    desc: 'Group related fields into custom composite types with struct and typedef, manipulate struct pointers using ->, and persist data with FILE* streams.',
    heroFilename: 'unit4_structs.c',
    heroCode: `#include <stdio.h>

typedef struct {
    int id;
    double gpa;
} Student;

int main(void) {
    Student s1 = {101, 3.92};
    Student *ptr = &s1;
    printf("ID: %d, GPA: %.2f\\n", ptr->id, ptr->gpa);
    return 0;
}`,
    modules: [
      {
        id: 'u4_m1',
        num: 'Module 4.1',
        title: 'Structures (struct) & typedef Composite Types',
        summary: 'Define custom records grouping multiple fields, initialize structs cleanly, and understand struct padding/alignment.',
        xp: 40,
        filename: 'structs_typedef.c',
        explanation: `
          <p>A <code>struct</code> groups variables of different types under a single composite data type stored contiguously in memory.</p>
          <h4>Working with Structs</h4>
          <ul>
            <li><strong>Dot Operator (<code>.</code>):</strong> Access fields directly on a struct variable: <code>student.gpa = 3.9;</code>.</li>
            <li><strong><code>typedef</code> Alias:</strong> Using <code>typedef struct { ... } Point;</code> lets you declare variables as <code>Point p1;</code> instead of writing <code>struct Point p1;</code> every time.</li>
            <li><strong>Designated Initializers (C99):</strong> Initialize fields explicitly by name: <code>Point p = {.x = 10, .y = 20};</code>.</li>
          </ul>
        `,
        code: `#include <stdio.h>

typedef struct {
    char name[32];
    int id;
    double gpa;
} Student;

int main(void) {
    Student s = {.name = "Aisha", .id = 2026, .gpa = 3.95};
    printf("Student: %s (#%d) - GPA: %.2f\\n", s.name, s.id, s.gpa);
    return 0;
}`,
        output: `Student: Aisha (#2026) - GPA: 3.95`,
        instructorNote: 'Remind students that passing a large `struct` by value copies every byte of the struct onto the stack. In real C codebases, we almost always pass `const Student *s` (a pointer) for efficiency!'
      },
      {
        id: 'u4_m2',
        num: 'Module 4.2',
        title: 'Pointers to Structs & The Arrow Operator (->)',
        summary: 'Pass structs efficiently by address and use ptr->field as clean syntactic sugar for (*ptr).field.',
        xp: 40,
        filename: 'struct_arrow.c',
        explanation: `
          <p>When you have a pointer to a struct (<code>Student *ptr</code>), you cannot use <code>ptr.gpa</code> because <code>ptr</code> is a memory address, not a struct.</p>
          <h4>The Arrow Operator (<code>-&gt;</code>)</h4>
          <ul>
            <li>Because the dot operator <code>.</code> has higher precedence than <code>*</code>, writing <code>*ptr.gpa</code> fails to compile—you would have to write <code>(*ptr).gpa</code>.</li>
            <li>C provides the <strong>arrow operator <code>ptr-&gt;gpa</code></strong>, which is 100% equivalent to <code>(*ptr).gpa</code>: it dereferences the pointer and accesses the member in one clean step!</li>
          </ul>
        `,
        code: `#include <stdio.h>

typedef struct {
    int x;
    int y;
} Vector2D;

void scale_vector(Vector2D *v, int factor) {
    v->x *= factor; // Equivalent to (*v).x *= factor;
    v->y *= factor;
}

int main(void) {
    Vector2D pos = {3, 7};
    scale_vector(&pos, 10);
    printf("Scaled Vector: (%d, %d)\\n", pos.x, pos.y);
    return 0;
}`,
        output: `Scaled Vector: (30, 70)`,
        instructorNote: 'Rule of thumb for students: Have a struct variable? Use `.` (dot). Have a pointer to a struct? Use `->` (arrow).'
      },
      {
        id: 'u4_m3',
        num: 'Module 4.3',
        title: 'File I/O Streams (FILE*, fopen, fprintf, fclose)',
        summary: 'Read and write persistent text and binary files safely using standard C file streams.',
        xp: 40,
        filename: 'file_io.c',
        explanation: `
          <p>C handles files through a buffered stream pointer of type <code>FILE *</code> defined in <code>&lt;stdio.h&gt;</code>.</p>
          <h4>Standard File Workflow</h4>
          <ul>
            <li><code>FILE *fp = fopen("data.txt", "w");</code> — Modes include <code>"r"</code> (read), <code>"w"</code> (write/truncate), and <code>"a"</code> (append).</li>
            <li><strong>Always Check for <code>NULL</code>:</strong> If a file doesn't exist in <code>"r"</code> mode, <code>fopen</code> returns <code>NULL</code>.</li>
            <li><code>fprintf</code> / <code>fscanf</code> / <code>fgets</code> — Read and write formatted text to the file stream.</li>
            <li><code>fclose(fp)</code> — Flushes internal buffers and releases the OS file descriptor.</li>
          </ul>
        `,
        code: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("scores.txt", "w");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    fprintf(fp, "Alice %d\\n", 98);
    fprintf(fp, "Bob %d\\n", 91);
    fclose(fp);

    printf("Successfully wrote 2 records to scores.txt\\n");
    return 0;
}`,
        output: `Successfully wrote 2 records to scores.txt`,
        instructorNote: 'Highlight that if a program crashes or exits without calling `fclose(fp)`, buffered output might never be flushed to disk.'
      }
    ],
    quizzes: [
      {
        id: 'q_u4_1',
        type: 'concept',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'Given `Sensor *s = &temp_sensor;`, which expression correctly accesses the `reading` member?',
        filename: 'arrow_op.c',
        code: `typedef struct { int id; double reading; } Sensor;\nSensor temp_sensor = {1, 24.5};\nSensor *s = &temp_sensor;`,
        options: [
          's->reading (or (*s).reading)',
          's.reading',
          '*s.reading',
          '&s->reading'
        ],
        correct: 0,
        hint: '`s` is a pointer to a struct, not a struct value.',
        explanation: '`s->reading` is syntactic sugar for `(*s).reading`. Notice `*s.reading` is wrong because `.` binds tighter than `*`.'
      },
      {
        id: 'q_u4_2',
        type: 'output',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'What will this program print after calling `upgrade(&item)`?',
        filename: 'struct_mod.c',
        code: `#include <stdio.h>

typedef struct {
    int level;
    int power;
} Gear;

void upgrade(Gear *g) {
    g->level += 1;
    g->power *= 2;
}

int main(void) {
    Gear shield = {3, 40};
    upgrade(&shield);
    printf("Lv.%d Power:%d\\n", shield.level, shield.power);
    return 0;
}`,
        options: ['Lv.4 Power:80', 'Lv.3 Power:40', 'Lv.4 Power:40', 'Lv.3 Power:80'],
        correct: 0,
        hint: '`upgrade` takes a pointer `Gear *g` and modifies `shield` in place.',
        explanation: 'Because `&shield` is passed by address, `g->level += 1` updates `level` to 4 and `g->power *= 2` updates `power` to 80.'
      },
      {
        id: 'q_u4_3',
        type: 'concept',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'What does `fopen("missing.txt", "r")` return if `"missing.txt"` does not exist on disk?',
        filename: 'fopen_null.c',
        code: `FILE *fp = fopen("missing.txt", "r");`,
        options: ['NULL', '-1', '0xFFFF', 'An empty FILE struct'],
        correct: 0,
        hint: 'Always check `if (fp == ???)` before reading from a file.',
        explanation: '`fopen` returns a `NULL` pointer if the file cannot be opened (e.g., missing file in read mode or permission denied).'
      },
      {
        id: 'q_u4_4',
        type: 'bug',
        difficulty: 'Medium • +50 XP',
        xp: 50,
        prompt: 'Why does `reset_point(p)` fail to reset `p.x` and `p.y` to 0 in `main()`?',
        filename: 'struct_by_val.c',
        code: `typedef struct { int x, y; } Point;

void reset_point(Point pt) {
    pt.x = 0;
    pt.y = 0;
}

int main(void) {
    Point p = {15, 25};
    reset_point(p);
}`,
        options: [
          'Structs in C are passed by value unless passed as a pointer (`Point *pt`)',
          'Struct fields are immutable after initialization',
          'You cannot pass a struct to a void function',
          '0 is not a valid int value'
        ],
        correct: 0,
        hint: 'Unlike arrays, structs are copied by value when passed directly to a function!',
        explanation: 'In C, passing `Point pt` copies the entire struct onto `reset_point`’s stack frame. To modify the caller’s struct, pass `Point *pt` and use `pt->x = 0;`.'
      },
      {
        id: 'q_u4_5',
        type: 'concept',
        difficulty: 'Easy • +40 XP',
        xp: 40,
        prompt: 'Which `fopen` mode appends data to the end of an existing file without erasing its current contents?',
        filename: 'fopen_modes.c',
        code: `FILE *log = fopen("app.log", ???);`,
        options: ['"a"', '"w"', '"r"', '"x"'],
        correct: 0,
        hint: '"w" truncates (wipes) the file, whereas this letter stands for "append".',
        explanation: '`"a"` opens the file for appending at the end (or creates it if it does not exist), preserving existing data.'
      }
    ],
    trace: {
      filename: 'struct_pointer_trace.c',
      lines: [
        'typedef struct { int id; int score; } Player;',
        'int main(void) {',
        '    Player p1 = {7, 50};',
        '    Player *ptr = &p1;',
        '    ptr->score += 25;',
        '    printf("Player #%d: %d pts\\n", p1.id, p1.score);',
        '    return 0;',
        '}'
      ],
      steps: [
        {
          line: 3,
          explanation: 'Allocate composite struct `p1` on the Stack: `p1.id` at 0x7ffe40 (4 bytes) and `p1.score` at 0x7ffe44 (4 bytes).',
          stdout: '',
          memory: [
            { addr: '0x7ffe40', name: 'p1.id', val: '7', type: 'stack', changed: true },
            { addr: '0x7ffe44', name: 'p1.score', val: '50', type: 'stack', changed: true }
          ]
        },
        {
          line: 4,
          explanation: 'Allocate struct pointer `ptr` at 0x7ffe50 holding the base address of `p1` (`0x7ffe40`).',
          stdout: '',
          memory: [
            { addr: '0x7ffe40', name: 'p1.id', val: '7', type: 'stack', changed: false },
            { addr: '0x7ffe44', name: 'p1.score', val: '50', type: 'stack', changed: false },
            { addr: '0x7ffe50', name: 'Player *ptr', val: '0x7ffe40 (→ p1)', type: 'pointer', changed: true }
          ]
        },
        {
          line: 5,
          explanation: '`ptr->score += 25` follows `ptr` (0x7ffe40) + offset of `score` (+4 bytes = 0x7ffe44) and adds 25 (50 -> 75).',
          stdout: '',
          memory: [
            { addr: '0x7ffe40', name: 'p1.id', val: '7', type: 'stack', changed: false },
            { addr: '0x7ffe44', name: 'p1.score', val: '75', type: 'stack', changed: true },
            { addr: '0x7ffe50', name: 'Player *ptr', val: '0x7ffe40 (→ p1)', type: 'pointer', changed: false }
          ]
        },
        {
          line: 6,
          explanation: '`printf` reads `p1.id` (7) and `p1.score` (75) and prints the formatted line to stdout.',
          stdout: 'Player #7: 75 pts\n',
          memory: [
            { addr: '0x7ffe40', name: 'p1.id', val: '7', type: 'stack', changed: false },
            { addr: '0x7ffe44', name: 'p1.score', val: '75', type: 'stack', changed: false },
            { addr: '0x7ffe50', name: 'Player *ptr', val: '0x7ffe40 (→ p1)', type: 'pointer', changed: false }
          ]
        }
      ]
    }
  }
};

// 8 INTERACTIVE C CODING CHALLENGES ACROSS ALL 4 UNITS
const C_CHALLENGES = [
  {
    id: 'c_chal_1',
    unit: 'basics',
    title: 'U1.1 — Sum of Multiples of 3 or 5',
    difficulty: 'Beginner',
    xp: 80,
    filename: 'sum_multiples.c',
    desc: 'Complete the C function <code>sum_multiples(int n)</code> that returns the sum of all positive integers from <code>1</code> to <code>n</code> (inclusive) that are divisible by <code>3</code> or <code>5</code>.',
    requirements: [
      'Use a <code>for</code> loop iterating from <code>1</code> up to <code>n</code> (inclusive).',
      'Use the modulo operator <code>%</code> to check divisibility (<code>i % 3 == 0 || i % 5 == 0</code>).',
      'Return the accumulated integer sum.'
    ],
    examples: [
      'Input: n = 10  → Multiples: 3, 5, 6, 9, 10 → Returns: 33',
      'Input: n = 15  → Multiples: 3, 5, 6, 9, 10, 12, 15 → Returns: 60'
    ],
    hint: 'Initialize `int sum = 0;`, loop `for (int i = 1; i <= n; i++)`, check `if (i % 3 == 0 || i % 5 == 0) sum += i;`, and `return sum;`.',
    starterCode: `#include <stdio.h>

int sum_multiples(int n) {
    int sum = 0;
    // TODO: Loop from 1 to n and add numbers divisible by 3 or 5
    
    return sum;
}`,
    solutionCode: `#include <stdio.h>

int sum_multiples(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            sum += i;
        }
    }
    return sum;
}`,
    validate(code) {
      const hasLoop = /for\s*\(|while\s*\(/.test(code);
      const hasMod3 = /%\s*3\s*==\s*0/.test(code);
      const hasMod5 = /%\s*5\s*==\s*0/.test(code);
      const hasReturn = /return\s+\w+\s*;/.test(code);
      const passed = hasLoop && hasMod3 && hasMod5 && hasReturn;
      return [
        { name: 'Test Case 1: sum_multiples(10) == 33', pass: passed, actual: passed ? '33' : '0 (Missing % 3 || % 5 loop logic)' },
        { name: 'Test Case 2: sum_multiples(15) == 60', pass: passed, actual: passed ? '60' : '0' },
        { name: 'Test Case 3: sum_multiples(2) == 0', pass: hasReturn, actual: '0' }
      ];
    }
  },
  {
    id: 'c_chal_2',
    unit: 'basics',
    title: 'U1.2 — Fix the Integer Division Temperature Bug',
    difficulty: 'Beginner',
    xp: 80,
    filename: 'celsius_to_fahrenheit.c',
    desc: 'The function <code>to_fahrenheit(int celsius)</code> has a classic C bug: it uses integer division <code>9 / 5</code>, which truncates to <code>1</code>! Fix the formula so it computes exact floating-point Fahrenheit: $F = C \\times \\frac{9.0}{5.0} + 32.0$.',
    requirements: [
      'Ensure floating-point division is used (e.g. <code>9.0 / 5.0</code> or <code>1.8</code> or <code>(double)</code> cast).',
      'Return the result as a <code>double</code>.'
    ],
    examples: [
      'Input: celsius = 0   → Returns: 32.00',
      'Input: celsius = 100 → Returns: 212.00',
      'Input: celsius = 25  → Returns: 77.00'
    ],
    hint: 'Change `9 / 5` to `9.0 / 5.0` (or `1.8`) so C performs floating-point division instead of integer division.',
    starterCode: `#include <stdio.h>

double to_fahrenheit(int celsius) {
    // BUG: 9 / 5 performs integer division (evaluates to 1)!
    return celsius * (9 / 5) + 32.0;
}`,
    solutionCode: `#include <stdio.h>

double to_fahrenheit(int celsius) {
    return celsius * (9.0 / 5.0) + 32.0;
}`,
    validate(code) {
      const stillHasIntDiv = /9\s*\/\s*5(?!\.)/.test(code) && !/\(double\)\s*9/.test(code) && !/\(float\)\s*9/.test(code);
      const hasFloatDiv = /9\.0\s*\/\s*5|9\s*\/\s*5\.0|1\.8|\(double\)/.test(code);
      const passed = !stillHasIntDiv && hasFloatDiv;
      return [
        { name: 'Test Case 1: to_fahrenheit(0) == 32.00', pass: true, actual: '32.00' },
        { name: 'Test Case 2: to_fahrenheit(100) == 212.00', pass: passed, actual: passed ? '212.00' : '132.00 (Integer division 9/5=1 detected!)' },
        { name: 'Test Case 3: to_fahrenheit(25) == 77.00', pass: passed, actual: passed ? '77.00' : '57.00' }
      ];
    }
  },
  {
    id: 'c_chal_3',
    unit: 'arrays',
    title: 'U2.1 — Find Maximum Element in an Array',
    difficulty: 'Intermediate',
    xp: 100,
    filename: 'find_max.c',
    desc: 'Implement <code>find_max(const int arr[], int size)</code> that scans an array of integers (guaranteed <code>size >= 1</code>) and returns the largest element.',
    requirements: [
      'Initialize your tracking variable to <code>arr[0]</code> (not <code>0</code>, so negative arrays work properly!).',
      'Iterate from index <code>1</code> to <code>size - 1</code> and update the maximum whenever <code>arr[i] > max</code>.',
      'Return the maximum integer.'
    ],
    examples: [
      'Input: {12, 45, 7, 89, 23}, size = 5 → Returns: 89',
      'Input: {-15, -4, -22, -9}, size = 4  → Returns: -4'
    ],
    hint: 'Start with `int max = arr[0];`, then loop `for (int i = 1; i < size; i++) { if (arr[i] > max) max = arr[i]; }`.',
    starterCode: `#include <stdio.h>

int find_max(const int arr[], int size) {
    int max = arr[0];
    // TODO: Loop through the array and update max
    
    return max;
}`,
    solutionCode: `#include <stdio.h>

int find_max(const int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
    validate(code) {
      const initArr0 = /arr\s*\[\s*0\s*\]/.test(code);
      const hasLoop = /for\s*\(|while\s*\(/.test(code);
      const hasCompare = /arr\s*\[\s*\w+\s*\]\s*>\s*\w+|\w+\s*<\s*arr\s*\[\s*\w+\s*\]/.test(code);
      const passed = initArr0 && hasLoop && hasCompare;
      return [
        { name: 'Test Case 1: {12, 45, 7, 89, 23} → 89', pass: passed, actual: passed ? '89' : '12 (Loop comparison missing)' },
        { name: 'Test Case 2: All Negative {-15, -4, -22, -9} → -4', pass: passed && initArr0, actual: passed ? '-4' : '0' },
        { name: 'Test Case 3: Single Element {42} → 42', pass: initArr0, actual: '42' }
      ];
    }
  },
  {
    id: 'c_chal_4',
    unit: 'arrays',
    title: 'U2.2 — Custom String Length (my_strlen)',
    difficulty: 'Intermediate',
    xp: 100,
    filename: 'my_strlen.c',
    desc: 'Implement your own version of <code>strlen</code> called <code>my_strlen(const char str[])</code> without calling <code>&lt;string.h&gt;</code> functions. Count how many characters appear before the null terminator <code>\'\\0\'</code>.',
    requirements: [
      'Loop until <code>str[len] != \'\\0\'</code> (or <code>str[len] != 0</code>).',
      'Do not include the null terminator itself in the returned count.',
      'Do not call the built-in <code>strlen()</code>.'
    ],
    examples: [
      'Input: "C99"       → Returns: 3',
      'Input: "Pointers"  → Returns: 8',
      'Input: ""          → Returns: 0'
    ],
    hint: 'Use `int len = 0; while (str[len] != \'\\0\') { len++; } return len;`.',
    starterCode: `#include <stdio.h>

int my_strlen(const char str[]) {
    int len = 0;
    // TODO: Advance len until you reach the null terminator '\\0'
    
    return len;
}`,
    solutionCode: `#include <stdio.h>

int my_strlen(const char str[]) {
    int len = 0;
    while (str[len] != '\\0') {
        len++;
    }
    return len;
}`,
    validate(code) {
      const usesBuiltin = /\bstrlen\s*\(/.test(code);
      const hasLoop = /while\s*\(|for\s*\(/.test(code);
      const checksIndex = /str\s*\[|\*\s*str/.test(code);
      const passed = !usesBuiltin && hasLoop && checksIndex;
      return [
        { name: 'Test Case 1: my_strlen("C99") == 3', pass: passed, actual: passed ? '3' : '0' },
        { name: 'Test Case 2: my_strlen("Pointers") == 8', pass: passed, actual: passed ? '8' : '0' },
        { name: 'Test Case 3: Empty string "" == 0 (No built-in strlen)', pass: !usesBuiltin, actual: usesBuiltin ? 'Disallowed: called built-in strlen()' : '0' }
      ];
    }
  },
  {
    id: 'c_chal_5',
    unit: 'pointers',
    title: 'U3.1 — Swap Two Integers via Pointers',
    difficulty: 'Intermediate',
    xp: 120,
    filename: 'swap_pointers.c',
    desc: 'Write the body of <code>void swap_ints(int *a, int *b)</code> so that it exchanges the integer values stored at memory addresses <code>a</code> and <code>b</code>.',
    requirements: [
      'Dereference <code>a</code> and <code>b</code> using the <code>*</code> operator.',
      'Use a temporary integer variable <code>int temp = *a;</code> to preserve the first value during the swap.'
    ],
    examples: [
      'Before: x = 15, y = 90 → Call swap_ints(&x, &y) → After: x = 90, y = 15',
      'Before: x = -5, y = 5  → Call swap_ints(&x, &y) → After: x = 5, y = -5'
    ],
    hint: 'Write: `int temp = *a; *a = *b; *b = temp;`',
    starterCode: `#include <stdio.h>

void swap_ints(int *a, int *b) {
    // TODO: Swap the integer values pointed to by a and b
    
}`,
    solutionCode: `#include <stdio.h>

void swap_ints(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
    validate(code) {
      const hasDerefA = /\*\s*a/.test(code);
      const hasDerefB = /\*\s*b/.test(code);
      const assignsA = /\*\s*a\s*=\s*\*\s*b/.test(code);
      const passed = hasDerefA && hasDerefB && assignsA;
      return [
        { name: 'Test Case 1: swap_ints(&x=15, &y=90) → x=90, y=15', pass: passed, actual: passed ? 'x=90, y=15' : 'x=15, y=90 (Values not swapped via *a and *b)' },
        { name: 'Test Case 2: swap_ints(&x=-5, &y=5) → x=5, y=-5', pass: passed, actual: passed ? 'x=5, y=-5' : 'Unchanged' }
      ];
    }
  },
  {
    id: 'c_chal_6',
    unit: 'pointers',
    title: 'U3.2 — Reverse an Array In-Place with Two Pointers',
    difficulty: 'Advanced',
    xp: 130,
    filename: 'reverse_array_ptrs.c',
    desc: 'Complete <code>reverse_array(int *arr, int size)</code> using two pointers (<code>int *left = arr;</code> and <code>int *right = arr + size - 1;</code>) to reverse the array in-place.',
    requirements: [
      'While <code>left < right</code>, swap <code>*left</code> and <code>*right</code>.',
      'Advance <code>left++</code> and move <code>right--</code> on each step.'
    ],
    examples: [
      'Input: {10, 20, 30, 40} → Output: {40, 30, 20, 10}',
      'Input: {1, 2, 3, 4, 5}  → Output: {5, 4, 3, 2, 1}'
    ],
    hint: 'Inside `while (left < right)`, swap `*left` and `*right` using `int tmp = *left; *left = *right; *right = tmp;`, then do `left++; right--;`.',
    starterCode: `#include <stdio.h>

void reverse_array(int *arr, int size) {
    int *left = arr;
    int *right = arr + size - 1;
    // TODO: While left < right, swap *left and *right and move pointers inward
    
}`,
    solutionCode: `#include <stdio.h>

void reverse_array(int *arr, int size) {
    int *left = arr;
    int *right = arr + size - 1;
    while (left < right) {
        int temp = *left;
        *left = *right;
        *right = temp;
        left++;
        right--;
    }
}`,
    validate(code) {
      const hasWhile = /while\s*\(\s*left\s*<\s*right\s*\)|for\s*\(/.test(code);
      const swapsPtrs = /\*\s*left\s*=\s*\*\s*right/.test(code) || /arr\s*\[/.test(code);
      const movesPtrs = /left\s*\+\+|right\s*--/.test(code);
      const passed = hasWhile && swapsPtrs && movesPtrs;
      return [
        { name: 'Test Case 1: {10, 20, 30, 40} → {40, 30, 20, 10}', pass: passed, actual: passed ? '{40, 30, 20, 10}' : '{10, 20, 30, 40}' },
        { name: 'Test Case 2: Odd length {1, 2, 3, 4, 5} → {5, 4, 3, 2, 1}', pass: passed, actual: passed ? '{5, 4, 3, 2, 1}' : 'Failed' }
      ];
    }
  },
  {
    id: 'c_chal_7',
    unit: 'structs',
    title: 'U4.1 — Update BankAccount Struct via Arrow Operator (->)',
    difficulty: 'Intermediate',
    xp: 110,
    filename: 'bank_struct.c',
    desc: 'Complete <code>deposit(BankAccount *acc, double amount)</code> so that if <code>amount > 0</code>, it adds <code>amount</code> to the account’s <code>balance</code> and increments <code>tx_count</code> by 1 using the arrow operator <code>-></code>.',
    requirements: [
      'Check that <code>acc != NULL</code> and <code>amount > 0</code>.',
      'Use <code>acc->balance += amount;</code> and <code>acc->tx_count++;</code>.'
    ],
    examples: [
      'Initial: {balance: 500.0, tx_count: 2} + deposit(250.0) → {balance: 750.0, tx_count: 3}',
      'Negative deposit(-50.0) → Ignored, balance remains unchanged'
    ],
    hint: 'Write: `if (acc != NULL && amount > 0) { acc->balance += amount; acc->tx_count++; }`',
    starterCode: `#include <stdio.h>

typedef struct {
    int id;
    double balance;
    int tx_count;
} BankAccount;

void deposit(BankAccount *acc, double amount) {
    // TODO: Validate amount > 0 and update acc->balance and acc->tx_count
    
}`,
    solutionCode: `#include <stdio.h>

typedef struct {
    int id;
    double balance;
    int tx_count;
} BankAccount;

void deposit(BankAccount *acc, double amount) {
    if (acc != NULL && amount > 0) {
        acc->balance += amount;
        acc->tx_count++;
    }
}`,
    validate(code) {
      const usesArrowBalance = /acc\s*->\s*balance|\(\s*\*\s*acc\s*\)\s*\.\s*balance/.test(code);
      const usesArrowTx = /acc\s*->\s*tx_count|\(\s*\*\s*acc\s*\)\s*\.\s*tx_count/.test(code);
      const checksAmount = /amount\s*>\s*0/.test(code);
      const passed = usesArrowBalance && usesArrowTx && checksAmount;
      return [
        { name: 'Test Case 1: deposit(&acc, 250.0) → balance=750.0, tx_count=3', pass: usesArrowBalance && usesArrowTx, actual: usesArrowBalance ? 'balance=750.0, tx_count=3' : 'Struct fields not updated via ->' },
        { name: 'Test Case 2: Reject negative deposit(&acc, -50.0)', pass: passed, actual: checksAmount ? 'Ignored (-50.0 rejected)' : 'Failed: negative amount was not guarded' }
      ];
    }
  },
  {
    id: 'c_chal_8',
    unit: 'structs',
    title: 'U4.2 — Compute Rectangle Area from Point Structs',
    difficulty: 'Intermediate',
    xp: 120,
    filename: 'rect_area.c',
    desc: 'Given nested structs <code>Point</code> and <code>Rect</code>, implement <code>int rect_area(const Rect *r)</code> that computes the area $(width \\times height)$ using <code>(r->top_right.x - r->bottom_left.x) * (r->top_right.y - r->bottom_left.y)</code>.',
    requirements: [
      'Use <code>r->top_right.x</code> and <code>r->bottom_left.x</code> to compute <code>width</code>.',
      'Use <code>r->top_right.y</code> and <code>r->bottom_left.y</code> to compute <code>height</code>.',
      'Return <code>width * height</code>.'
    ],
    examples: [
      'bottom_left = (2, 3), top_right = (10, 8) → width = 8, height = 5 → Area = 40'
    ],
    hint: 'Compute `int w = r->top_right.x - r->bottom_left.x;` and `int h = r->top_right.y - r->bottom_left.y;`, then `return w * h;`.',
    starterCode: `#include <stdio.h>

typedef struct { int x; int y; } Point;
typedef struct { Point bottom_left; Point top_right; } Rect;

int rect_area(const Rect *r) {
    // TODO: Calculate width * height using r->top_right and r->bottom_left
    
    return 0;
}`,
    solutionCode: `#include <stdio.h>

typedef struct { int x; int y; } Point;
typedef struct { Point bottom_left; Point top_right; } Rect;

int rect_area(const Rect *r) {
    int width = r->top_right.x - r->bottom_left.x;
    int height = r->top_right.y - r->bottom_left.y;
    return width * height;
}`,
    validate(code) {
      const hasTopRight = /r\s*->\s*top_right\s*\.\s*x/.test(code);
      const hasBottomLeft = /r\s*->\s*bottom_left\s*\.\s*x/.test(code);
      const hasY = /r\s*->\s*top_right\s*\.\s*y/.test(code) && /r\s*->\s*bottom_left\s*\.\s*y/.test(code);
      const passed = hasTopRight && hasBottomLeft && hasY;
      return [
        { name: 'Test Case 1: Rect((2,3), (10,8)) → Area = 40', pass: passed, actual: passed ? '40' : '0' },
        { name: 'Test Case 2: Rect((0,0), (6,6)) → Area = 36', pass: passed, actual: passed ? '36' : '0' }
      ];
    }
  }
];

// 8 UNLOCKABLE C PROGRAMMING BADGES
const C_BADGES = [
  {
    id: 'badge_first_compile',
    icon: '⚡',
    name: 'First C Compile',
    desc: 'Complete your first C lecture module or pass a coding challenge.',
    check: (state) => state.completedModules.length >= 1 || state.solvedChallenges.length >= 1
  },
  {
    id: 'badge_streak_3',
    icon: '🔥',
    name: 'Preprocessor Hot Streak',
    desc: 'Achieve a 3x consecutive correct answer streak in the C Quiz Arena.',
    check: (state) => state.maxStreak >= 3
  },
  {
    id: 'badge_u1_master',
    icon: '🧭',
    name: 'Control Flow Cadet',
    desc: 'Complete all 3 modules in Unit 1 (Basics & Control Flow).',
    check: (state) => ['u1_m1', 'u1_m2', 'u1_m3'].every(id => state.completedModules.includes(id))
  },
  {
    id: 'badge_string_tamer',
    icon: '🧵',
    name: 'Null-Terminator Tamer',
    desc: 'Solve the my_strlen C string challenge without <string.h>.',
    check: (state) => state.solvedChallenges.includes('c_chal_4')
  },
  {
    id: 'badge_pointer_wizard',
    icon: '🧙‍♂️',
    name: 'Pointer Dereference Wizard',
    desc: 'Solve both Unit 3 Pointer Coding Challenges (swap_ints & reverse_array).',
    check: (state) => state.solvedChallenges.includes('c_chal_5') && state.solvedChallenges.includes('c_chal_6')
  },
  {
    id: 'badge_struct_architect',
    icon: '🏗️',
    name: 'Struct & Arrow Architect',
    desc: 'Solve a Unit 4 Struct pointer coding challenge using the -> operator.',
    check: (state) => state.solvedChallenges.includes('c_chal_7') || state.solvedChallenges.includes('c_chal_8')
  },
  {
    id: 'badge_quiz_champion',
    icon: '🎯',
    name: 'Undefined Behavior Hunter',
    desc: 'Answer at least 10 C Quiz Arena questions correctly.',
    check: (state) => state.answeredQuizzes.length >= 10
  },
  {
    id: 'badge_kernighan_ritchie',
    icon: '👑',
    name: 'K&R Systems Grandmaster',
    desc: 'Reach 500+ total XP across C modules, quizzes, and coding challenges.',
    check: (state) => state.xp >= 500
  }
];

const INITIAL_CLASSMATES = [
  { name: 'Dennis R. (TA)', xp: 680, avatar: '🧔' },
  { name: 'Linus T.', xp: 540, avatar: '🐧' },
  { name: 'Margaret H.', xp: 420, avatar: '👩‍🚀' },
  { name: 'Ken T.', xp: 310, avatar: '🧙‍♂️' },
  { name: 'Grace H.', xp: 190, avatar: '⚓' }
];
