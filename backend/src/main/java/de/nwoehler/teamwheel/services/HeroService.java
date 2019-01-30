package de.nwoehler.teamwheel.services;

import de.nwoehler.teamwheel.domain.HeroEntity;
import de.nwoehler.teamwheel.domain.HeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HeroService {

    private final HeroRepository heroRepository;

    @Autowired
    public HeroService(HeroRepository heroRepository) {
        this.heroRepository = heroRepository;
    }

    /**
     * Load all available heroes.
     *
     * @return all heroes
     */
    public Iterable<HeroEntity> getAllHeroes() {
        return heroRepository.findAll();
    }

    /**
     * Finds the hero by ID
     *
     * @param id the ID of the hero
     * @return the hero or null
     */
    public Optional<HeroEntity> getHero(Long id) {
        return heroRepository.findById(id);
    }
}
