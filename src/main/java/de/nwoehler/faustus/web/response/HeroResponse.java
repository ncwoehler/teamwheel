package de.nwoehler.faustus.web.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroResponse {
    private long id;
    private String heroName;
}
