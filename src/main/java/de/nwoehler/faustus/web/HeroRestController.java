package de.nwoehler.faustus.web;

import de.nwoehler.faustus.domain.HeroEntity;
import de.nwoehler.faustus.services.HeroService;
import de.nwoehler.faustus.web.response.HeroResponse;
import de.nwoehler.faustus.web.response.HeroesResponse;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
public class HeroRestController {

    private final MapperFacade mapperFacade;

	private final HeroService heroService;

    @Autowired
    public HeroRestController(MapperFacade mapperFacade, HeroService heroService) {
        this.mapperFacade = mapperFacade;
        this.heroService = heroService;
    }

    @RequestMapping(path = "/api/heroes", produces = MediaType.APPLICATION_JSON_VALUE)
	public HeroesResponse getHeroes() {
		log.info("GET called on /api/heroes resource");
        List<HeroResponse> heroes = mapperFacade.mapAsList(heroService.getAllHeroes(), HeroResponse.class);
        return new HeroesResponse(heroes);
	}

    @RequestMapping(path = "/api/heroes/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public HeroResponse getHero(@PathVariable long id) {
        log.info("GET called on /api/heroes/{} resource", id);
        Optional<HeroEntity> hero = heroService.getHero(id);
        if (hero.isPresent()) {
            return mapperFacade.map(hero.get(), HeroResponse.class);
        }
        throw new NotFoundException();
    }

}
