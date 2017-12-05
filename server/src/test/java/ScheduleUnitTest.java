import com.dragon.server.entity.Schedule;
import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class ScheduleUnitTest {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Test
    public void test() {

        System.out.println(encoder.encode("admin"));
        System.out.println(encoder.encode("teacher"));
        System.out.println(encoder.encode("user"));
    }
}
