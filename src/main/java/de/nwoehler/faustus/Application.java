package de.nwoehler.faustus;

import com.github.javafaker.Faker;
import de.nwoehler.faustus.domain.HeroEntity;
import de.nwoehler.faustus.domain.HeroRepository;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.stream.IntStream;
import java.util.stream.StreamSupport;

@Slf4j
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
