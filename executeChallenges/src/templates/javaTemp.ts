export const javaTemp = (args: string, func:string) => `

    import java.util.*;
    import java.io.*;

    public class SimpleClass {

        public SimpleClass() {
        }

        ${func}
        
        public static void main(String[] args) {
            SimpleClass test = new SimpleClass();
            System.out.println(test.solution(${args}));
        }

    }


`