package de.nwoehler.teamwheel.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroRepository extends CrudRepository<HeroEntity, Long> {
}
