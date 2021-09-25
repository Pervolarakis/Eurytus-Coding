export const javaTemp = (args: string, func:string, expectedOutput:string) => `

    import java.util.*;
    import java.io.*;
    import java.lang.reflect.*;

    public class SimpleClass {

        public SimpleClass() {
        }
        
        ${func}
        
        public static void main(String[] args) {
            SimpleClass test = new SimpleClass();
            System.out.println(check.checkEquality(${expectedOutput}, test.solution(${args})));
        }

    }
    
    class check{

        static boolean checkEquality(int[] a, int[] b)
        {
            return Arrays.equals(a,b);
        }
        static boolean checkEquality(long[] a, long[] b)
        {
            return (Arrays.equals(a,b));
        }
        static boolean checkEquality(float[] a, float[] b)
        {
            return (Arrays.equals(a,b));
        }
        static boolean checkEquality(double[] a, double[] b)
        {
            return (Arrays.equals(a,b));
        }
        static boolean checkEquality(char[] a, char[] b)
        {
            return (Arrays.equals(a,b));
        }
        static boolean checkEquality(boolean[] a, boolean[] b)
        {
            return (Arrays.equals(a,b));
        }
        static boolean checkEquality(short[] a, short[] b)
        {
            return (Arrays.equals(a,b));
        }
        static <T>boolean checkEquality(T a, T b) {
    
            if (a instanceof String || a instanceof Integer || a instanceof Short || a instanceof Long
                    || a instanceof Byte || a instanceof Character || a instanceof Boolean
                    || a instanceof Float || a instanceof Double || a instanceof Map || a instanceof Set || a instanceof List) {
                return (a.equals(b));
            }
            else if (a instanceof String[] || a instanceof Integer[] || a instanceof Short[] || a instanceof Long[]
                    || a instanceof Byte[] || a instanceof Character[] || a instanceof Boolean[]
                    || a instanceof Float[] || a instanceof Double[] || a instanceof Map[] || a instanceof Set[] || a instanceof List[]) {
                return (Arrays.equals((Object[]) a,(Object[]) b));
            }
            else if (a instanceof int[]){
                return (check.checkEquality((int[])a,(int[]) b));
            }
            else if (a instanceof short[]){
                return (check.checkEquality((short[])a,(short[]) b));
            }
            else if (a instanceof long[]){
                return (check.checkEquality((long[])a,(long[]) b));
            }
            else if (a instanceof byte[]){
                return (check.checkEquality((byte[])a,(byte[]) b));
            }
            else if (a instanceof char[]){
                return (check.checkEquality((char[])a,(char[]) b));
            }
            else if (a instanceof boolean[]){
                return (check.checkEquality((boolean[])a,(boolean[]) b));
            }
            else if (a instanceof float[]){
                return (check.checkEquality((float[])a,(float[]) b));
            }
            else if (a instanceof double[]) {
                return (check.checkEquality((double[])a,(double[]) b));
            }
            else {
                return(compareObject(a, b));
            }
        }
    
    
        public static boolean compareObject(Object o1, Object o2){
    
            // Record comparison results
            boolean retFlag = true;
    
            // First of all, it is judged whether the object to be compared is null, one is null, and the other is not null, and the return is not equal.
            if((o1 == null && o2 != null)||(o1 != null && o2 == null)){
                return false;
            }
    
            // When both are null, return equal
            if(o1 ==null && o2==null){
                return true;
            }
    
            // +++++++++++++++++++++ Continue to compare +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
            // First, we compare whether the two objects have the same type, different type and different direct return.
            if(o1.getClass().isInstance(o2)){
    
    
                try {
    
                    // Obtain object classes that need to be compared by reflection
                    Class clzz = Class.forName(o1.getClass().getName());
    
                    // Get the attribute object corresponding to the class
                    Field[] fs = clzz.getDeclaredFields();
    
                    // Compare attribute values in turn
                    for(Field ftemp : fs){
    
                        // set fields to accessible
                        ftemp.setAccessible(true);
                        Class<?> Cls = ftemp.getType();
                        //get field value from each object
                        Object v1 = ftemp.get(o1);
                        Object v2 = ftemp.get(o2);
    
                        if(!check.checkEquality(v1, v2)){
                            retFlag = false;
                            break;
                        }
                    }
    
                } catch (ClassNotFoundException e) {
                    System.out.println("fail to compare Objects !");
                    retFlag = false;
                } catch (IllegalAccessException e) {
                    System.out.println("fail to compare Objects !");
                    retFlag = false;
                }
            }else{
                retFlag = false;
            }
    
            return retFlag;
        }
    
    }


`