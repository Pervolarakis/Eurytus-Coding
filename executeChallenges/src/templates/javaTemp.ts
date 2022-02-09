export const javaTemp = (outPutFunctionCalls: string, userFunction:string, checkEqualityLogic: string, detectClassesMain: string, detectClassesLogic: string) => `

    import java.util.*;
    import java.io.*;
    import java.lang.reflect.*;

    public class SimpleClass {
    
        public static void main(String[] args) {
            System.out.println("{");
            ${outPutFunctionCalls}
            ${detectClassesMain}
            System.out.println("}");
        }

        ${detectClassesLogic}

    }
    /**user code starts here*/
    ${userFunction}
    /**user code ends here*/
    ${checkEqualityLogic}

`