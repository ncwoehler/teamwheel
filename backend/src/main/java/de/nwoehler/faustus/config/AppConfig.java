package de.nwoehler.faustus.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class AppConfig {

    @Value("${faustus.heroes.generate}")
    private boolean generateHeroes;

    @Value("${faustus.heroes.count:10}")
    private int numberOfHeroes;
}
