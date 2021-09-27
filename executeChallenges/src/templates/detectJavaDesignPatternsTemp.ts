export const detectJavaDesignPatternsTemp = (codeInput: string, currentClass: string) => `

    import java.util.*;
    import java.io.*;
    import java.lang.reflect.*;

    public class Main {

        public static void main(String[] args){
            //pairno tin clasi
            Class cl = ${currentClass}.class;
            //pairno tin uperklasi
            Class supercl = cl.getSuperclass();
            String modifiers = Modifier.toString(cl.getModifiers());
            System.out.print("{");
            System.out.print("\\"className\\": \\""+cl.getName()+"\\",");
            if (modifiers.length() > 0) System.out.print("\\"modifiers\\": [\\"" +String.join("\\",\\"",modifiers.split("\\\\|", -1)) + "\\"],");
            else System.out.print("\\"modifiers\\": [],");
            //System.out.print("class " + name);
            if (supercl != null && supercl != Object.class) System.out.print("\\"superClass\\": \\"" + supercl.getName()+"\\",");
            else System.out.print("\\"superClass\\": \\"\\",");


            printInterfaces(cl);


            printConstructors(cl);

            printMethods(cl);

            printFields(cl);
            System.out.print("}");
        }

        public static void printInterfaces(Class cl){
            Class<?>[] interfaces = cl.getInterfaces();
            System.out.print("\\"interfaces\\": [");
            for (int j = 0; j < interfaces.length; j++){
                if (j > 0) System.out.print(", ");
                System.out.print("\\""+interfaces[j].getSimpleName()+"\\"");
            }
            System.out.print("],");
        }
    
        /**
         * Prints all constructors of a class
         * @param cl a class
         */
        public static void printConstructors(Class cl)
        {
            Constructor[] constructors = cl.getDeclaredConstructors();
            //gia kathe constructor
            System.out.print("\\"constructors\\": [");
            for (int j = 0; j < constructors.length; j++){
                //pairno to onoma t constructor
                String name = constructors[j].getName();
                if (j > 0) System.out.print(",");
                System.out.print("{");
                //pairno ton modifier t px public private etc
                String modifiers = Modifier.toString(constructors[j].getModifiers());
                //gia kathe constructor typose modifier name px private Constructor1(
                if (modifiers.length() > 0) System.out.print("\\"modifiers\\": [\\""+ String.join("\\",\\"",modifiers.split("\\\\|", -1)) + "\\"],");
                else System.out.print("\\"modifiers\\": [],");
                System.out.print("\\"parameters\\": [");
    
                //pairno ola ta arguments
                Class[] paramTypes = constructors[j].getParameterTypes();
                for (int k = 0; k < paramTypes.length; k++)
                {
                    //ta typono me koma metaksi tous
                    if (k > 0) System.out.print(", ");
                    System.out.print("\\""+paramTypes[k].getName()+"\\"");
                }
                System.out.print("]}");
            }
            System.out.print("],");
        }
    
        /**
         * Prints all methods of a class
         * @param cl a class
         */
        public static void printMethods(Class cl) {
            //pairno oles tis methodous tis klassis
            Method[] methods = cl.getDeclaredMethods();
    
            System.out.print("\\"methods\\": [");
            for (int j = 0; j < methods.length; j++) {
    
                    if (j > 0) System.out.print(",");
                    System.out.print("{");
                    String overrides = "false";
                    //gia kathe methodo pairno to return type kai to name
                    Class retType = methods[j].getReturnType();
                    String name = methods[j].getName();
    
                    try {
                        cl.getSuperclass().getMethod(methods[j].getName(), methods[j].getParameterTypes());
                        overrides = "\\"" + cl.getSuperclass().getName() + "\\"";
                    } catch (NoSuchMethodException e) {
                        for (Class<?> iface : cl.getInterfaces()) {
                            try {
                                iface.getMethod(methods[j].getName(), methods[j].getParameterTypes());
                                overrides = "\\"" + iface.getName() + "\\"";
                            } catch (NoSuchMethodException ignored) {
    
                            }
                        }
                    } catch (NullPointerException e) {
                    }
    
    
                    //pairno tous modifiers px public static
                    String modifiers = Modifier.toString(methods[j].getModifiers());
    
                    //typono modifiers returntype kai onoma methodou
                    System.out.print("\\"name\\": \\"" + name + "\\",");
                    if (modifiers.length() > 0) System.out.print("\\"modifiers\\": [\\"" + String.join("\\",\\"", modifiers.split(" ", -1)) + "\\"],");
                    else System.out.print("\\"modifiers\\": [],");
                    System.out.print("\\"returnType\\": \\"" + retType.getName() + "\\",");
                    System.out.print("\\"parameters\\": [");
                    //pairno parameter types kai ta typono me koma metaksi tous
                    Class[] paramTypes = methods[j].getParameterTypes();
                    for (int k = 0; k < paramTypes.length; k++) {
                        if (k > 0) System.out.print(", ");
                        System.out.print("\\"" + paramTypes[k].getName() + "\\"");
                    }
                    System.out.print("],");
                    System.out.print("\\"overrides\\": " + overrides);
                    System.out.print("}");
                }
                System.out.print("],");
            }
    
        /**
         * Prints all fields of a class
         * @param cl a class
         */
        public static void printFields(Class cl){
            //pairno ola ta fields
            Field[] fields = cl.getDeclaredFields();
            System.out.print("\\"fields\\": [");
            for (int j = 0; j < fields.length; j++) {
                if (j > 0) System.out.print(",");
                System.out.print("{");
                //gia kathe field typono modifier type kai onoma
                Class type = fields[j].getType();
                String name = fields[j].getName();
    
                String modifiers = Modifier.toString(fields[j].getModifiers());
                if (modifiers.length() > 0) System.out.print("\\"modifiers\\": [\\"" + String.join("\\",\\"",modifiers.split("\\\\|", -1)) + "\\"],");
                else System.out.print("\\"modifiers\\": [],");
                System.out.print("\\"name\\": \\""+name+"\\",");
                System.out.print("\\"type\\": \\""+type.getName()+"\\"");
                System.out.print("}");
            }
            System.out.print("]");
        }
    }

    ${codeInput}

`