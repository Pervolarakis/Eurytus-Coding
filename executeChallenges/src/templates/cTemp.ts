//basic template for c code. Receives 2 arguments. 1st one are the arguments of the solve function ('5,10,15'). 2nd
//argumnt is the solve function itself solve(int a, int b, int c){int sum = a+b+c; printf("%d",sum)}
//cTemp('5, 10, 15','void solve(int a,int b, int c){int sum = a+b+c; printf("%d",sum);}')

export const cTemp = (args: string, func: string) => `
    
    #include <assert.h>
    #include <ctype.h>
    #include <locale.h>
    #include <math.h>
    #include <setjmp.h>
    #include <signal.h>
    #include <stdarg.h>
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <time.h>

    ${func}

    int main() {
        
        solution(${args});
        return 0;
    }

`
