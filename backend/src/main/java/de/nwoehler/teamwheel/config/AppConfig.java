package de.nwoehler.teamwheel.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class AppConfig {

    @Value("${teamwheel.heroes.generate}")
    private boolean generateHeroes;

    @Value("${teamwheel.heroes.count:10}")
    private int numberOfHeroes;
}
