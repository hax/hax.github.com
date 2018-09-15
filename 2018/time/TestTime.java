import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.TimeZone;
class TestTime {
    public static void main(String[] args) throws ParseException {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sf.setTimeZone(TimeZone.getTimeZone("Asia/shanghai"));
        String str3 = "1927-12-31 23:54:00";
        String str4 = "1927-12-31 23:54:10";
        Date sDt3 = sf.parse(str3);
        Date sDt4 = sf.parse(str4);
        long ld3 = sDt3.getTime();
        long ld4 = sDt4.getTime();
        System.out.println(ld3);
        System.out.println(ld4);
        System.out.println(ld4 - ld3);
    }
}
