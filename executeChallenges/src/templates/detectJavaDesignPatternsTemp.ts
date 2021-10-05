export const detectJavaDesignPatternsTemp = (codeInput: string, classNames: string) => `

    import java.util.*;
    import java.io.*;
    import java.lang.reflect.*;

    public class Main{

        public static void main(String[] args){
            //pairno tin clasi

            System.out.println('[');
            String[] classNames = new String[]{${classNames}};
            for(int i=0; i<classNames.length; i++){
                try {
                    
                    Class c = Class.forName(classNames[i]);
                    if(i>0)System.out.println(',');
                    printClass(c);
                } catch (ClassNotFoundException e) {}
            }

            System.out.println(']');



        }

        public static String printPrimitive(String prim){
            String str = prim.replace("java.lang.","");
            str = str.replace("java.util.","");
            str = str.replace("class ","");
            str = str.replace("interface ","");
            if(str.startsWith("[L")){
                str = str.replace("[L","");
                str = str.replace(";","[]");
            }
            if(str.startsWith("[")){
                str = str.replace("[","");
                if(str.equals("B")) return "byte[]";
                if(str.equals("S")) return "short[]";
                if(str.equals("Z")) return "boolean[]";
                if(str.equals("C")) return "char[]";
                if(str.equals("D")) return "double[]";
                if(str.equals("J")) return "long[]";
                if(str.equals("F")) return "float[]";
                if(str.equals("I")) return "int[]";
            }
            return str;
        }
    
        public static void printClass(Class cl){
            //pairno tin uperklasi
            Class supercl = cl.getSuperclass();
            String modifiers = Modifier.toString(cl.getModifiers());
            if(cl.getName().indexOf('$')>-1)System.out.print(",{\\n");
            else System.out.print("{\\n");
            System.out.println("\\"className\\": \\""+cl.getName()+"\\",");
            if (modifiers.length() > 0) System.out.println("\\"modifiers\\": [\\"" +String.join("\\",\\"",modifiers.split("\\\\|", -1)) + "\\"],");
            else System.out.println("\\"modifiers\\": [],");
            //System.out.print("class " + name);
            if (supercl != null && supercl != Object.class) System.out.println("\\"superClass\\": \\"" + supercl.getName()+"\\",");
            else System.out.println("\\"superClass\\": \\"\\",");
    
    
            printInterfaces(cl);
            printConstructors(cl);
            printMethods(cl);
            printFields(cl);
            System.out.println("}");
    
            Class[] childClasses =  cl.getDeclaredClasses();
    
            for(int j=0; j<childClasses.length; j++){
                printClass(childClasses[j]);
            }
    
        }
    
        public static void printInterfaces(Class cl){
            Class<?>[] interfaces = cl.getInterfaces();
            System.out.print("\\"interfaces\\": [");
            for (int j = 0; j < interfaces.length; j++){
                if (j > 0) System.out.print(", ");
                System.out.print("\\""+interfaces[j].getSimpleName()+"\\"");
            }
            System.out.println("],");
        }
    
        /**
         * Prints all constructors of a class
         * @param cl a class
         */
        public static void printConstructors(Class cl)
        {
            Constructor[] constructors = cl.getDeclaredConstructors();
            //gia kathe constructor
            System.out.println("\\"constructors\\": [");
            for (int j = 0; j < constructors.length; j++){
                //pairno to onoma t constructor
                String name = constructors[j].getName();
                if (j > 0) System.out.print(",");
                System.out.print("{\\n");
                //pairno ton modifier t px public private etc
                String modifiers = Modifier.toString(constructors[j].getModifiers());
                //gia kathe constructor typose modifier name px private Constructor1(
                if (modifiers.length() > 0) System.out.println("\\"modifiers\\": [\\""+ String.join("\\",\\"",modifiers.split("\\\\|", -1)) + "\\"],");
                else System.out.println("\\"modifiers\\": [],");
                System.out.print("\\"parameters\\": [");
    
                //pairno ola ta arguments
                Type[] types = constructors[j].getGenericParameterTypes();
                for (int k = 0; k < types.length; k++)
                {
                    //ta typono me koma metaksi tous
                    if (k > 0) System.out.print(", ");
                    System.out.print("\\""+printPrimitive(types[k].toString())+"\\"");
                }
                System.out.println("]\\n}");
            }
            System.out.println("],");
        }
    
        /**
         * Prints all methods of a class
         * @param cl a class
         */
        public static void printMethods(Class cl) {
            //pairno oles tis methodous tis klassis
            Method[] methods = cl.getDeclaredMethods();
    
            System.out.println("\\"methods\\": [");
            for (int j = 0; j < methods.length; j++) {
    
                if (j > 0) System.out.print(",");
                System.out.print("{\\n");
                String overrides = "false";
                //gia kathe methodo pairno to return type kai to name
                Type retType = methods[j].getGenericReturnType();
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
                System.out.println("\\"name\\": \\"" + name + "\\",");
                if (modifiers.length() > 0) System.out.println("\\"modifiers\\": [\\"" + String.join("\\",\\"", modifiers.split(" ", -1)) + "\\"],");
                else System.out.println("\\"modifiers\\": [],");
                System.out.println("\\"returnType\\": \\"" + printPrimitive(retType.toString()) + "\\",");
                System.out.print("\\"parameters\\": [");
                //pairno parameter types kai ta typono me koma metaksi tous
                Type[] paramTypes = methods[j].getGenericParameterTypes();
                for (int k = 0; k < paramTypes.length; k++) {
                    if (k > 0) System.out.print(", ");
                    System.out.print("\\"" + printPrimitive(paramTypes[k].toString()) + "\\"");
                }
                System.out.println("],");
                System.out.println("\\"overrides\\": " + overrides);
                System.out.println("}");
            }
            System.out.println("],");
        }
    
        /**
         * Prints all fields of a class
         * @param cl a class
         */
        public static void printFields(Class cl){
            //pairno ola ta fields
            Field[] fields = cl.getDeclaredFields();
            System.out.println("\\"fields\\": [");
            for (int j = 0; j < fields.length; j++) {
                if (j > 0) System.out.print(",");
                System.out.print("{\\n");
                //gia kathe field typono modifier type kai onoma
                String name = fields[j].getName();
                Type type = fields[j].getGenericType();
                String modifiers = Modifier.toString(fields[j].getModifiers());
                if (modifiers.length() > 0) System.out.println("\\"modifiers\\": [\\"" + String.join("\\",\\"",modifiers.split("\\\\|", -1)) + "\\"],");
                else System.out.println("\\"modifiers\\": [],");
                System.out.println("\\"name\\": \\""+name+"\\",");
                System.out.println("\\"type\\": \\""+printPrimitive(type.toString())+"\\"");
                System.out.println("}");
            }
            System.out.println("]");
        }
    }

    ${codeInput}

`