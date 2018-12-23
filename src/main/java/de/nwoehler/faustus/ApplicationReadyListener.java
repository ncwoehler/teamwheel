package de.nwoehler.faustus;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import de.nwoehler.faustus.config.AppConfig;
import de.nwoehler.faustus.domain.HeroEntity;
import de.nwoehler.faustus.domain.HeroRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.stream.IntStream;

@Slf4j
@Component
public class ApplicationReadyListener  implements ApplicationListener<ApplicationReadyEvent> {

    private final AppConfig appConfig;
    private final HeroRepository heroRepository;

    @Autowired
    public ApplicationReadyListener(AppConfig appConfig, HeroRepository heroRepository) {
        this.appConfig = appConfig;
        this.heroRepository = heroRepository;
    }

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        if (appConfig.isGenerateHeroes()) {
            log.info("Generating {} heroes.", appConfig.getNumberOfHeroes());
            Faker faker = new Faker();
            IntStream.range(0, appConfig.getNumberOfHeroes()).forEach(i -> {
                Name officialName = faker.name();
                String heroName = faker.superhero().name();
                HeroEntity newHero = new HeroEntity();
                newHero.setHeroName(heroName);
                newHero.setFirstName(officialName.firstName());
                newHero.setLastName(officialName.lastName());
                heroRepository.save(newHero);
                log.info("Generated hero: {}", newHero);
            });
        } else {
            log.info("Skipping heroes generation.");
        }
    }

}