export const javaTemp = (args: string, func:string) => `

    import java.util.*;
    import java.io.*;

    public class SimpleClass {

        public SimpleClass() {
        }
        
        ${func}
        
        public static void main(String[] args) {
            SimpleClass test = new SimpleClass();
            check.printType(test.solution(${args}));
        }

    }
    
    class check{

        static void printType(Byte a)
        {
            System.out.println(a);
        }

        static void printType(Integer a)
        {
            System.out.println(a);
        }
        static void printType(Character c)
        {
            System.out.println(c);
        }
        static void printType(Float f)
        {
            System.out.println(f);
        }
        static void printType(Double d)
        {
            System.out.println(d);
        }
        static void printType(Long l)
        {
            System.out.println(l);
        }
        static void printType(String s)
        {
            System.out.println(s);
        }
        static void printType(Boolean s)
        {
            System.out.println(s);
        }
        static void printType(Short s)
        {
            System.out.println(s);
        }
        static <T>void printType(T[] array) {
            System.out.println(Arrays.deepToString(array));
        }
        static <T>void printType(List<T> array) {
            Object[] str = GetStringArray(array);
    
            // Print Array elements
            System.out.print(Arrays.deepToString(str));
        }
        static <T>void printType(Set<T> array) {
            // String[] str = GetStringArray(array);
    
            // Print Array elements
            System.out.print(Arrays.deepToString(array.toArray()));
        }
        static <T,J>void printType(Map<T,J> array) {
            // String[] str = GetStringArray(array);
            String[] str = new String[array.size()];
            // Print Array elements
            Integer index=0;
            for (Map.Entry entry : array.entrySet())
            {
    //            System.out.println(entry.getKey());
    //            System.out.println(entry.getValue());
                String kt;
                try {
                   kt  = Arrays.deepToString((Object[]) entry.getValue());
                }
                catch(Exception e) {
                    kt = entry.getValue().toString();
                }
                str[index++] = entry.getKey() + "=" + kt;
    
            }
            System.out.println('{'+String.join(", ", str)+'}');
    //        System.out.println("mpainei edo");
    //         List<Map<T , J>> myMap  = new ArrayList<Map<T,J>>();
    //         myMap.add(0,array);
    //         Object[] str = GetStringArray(myMap);
    //         System.out.print(Arrays.deepToString(myMap.toArray()));
    //         Object[] obj = new Object[1];
    //         obj[0] = array;
    //         System.out.println(Arrays.deepToString(obj));
        }    
    
        static void printType(int[] s)
        {
            System.out.println(Arrays.toString(s));
        }
        static void printType(long[] s)
        {
            System.out.println(Arrays.toString(s));
        }
        static void printType(float[] s)
        {
            System.out.println(Arrays.toString(s));
        }
        static void printType(double[] s)
        {
            System.out.println(Arrays.toString(s));
        }
        static void printType(byte[] s)
        {
            System.out.println(Arrays.toString(s));
        }
        static void printType(char[] s)
        {
            System.out.println(Arrays.toString(s));
        }
        static void printType(boolean[] s)
        {
            System.out.println(Arrays.toString(s));
        }
        static void printType(short[] s)
        {
            System.out.println(Arrays.toString(s));
        }
    
        public static <T>Object[] GetStringArray(List<T> arr)
        {
    
            // declaration and initialise String Array
            Object str[] = new Object[arr.size()];
    
            // ArrayList to Array Conversion
            for (int j = 0; j < arr.size(); j++) {
    
                // Assign each value to String array
                str[j] = arr.get(j);
            }
    
            return str;
        }
    
    
    }


`