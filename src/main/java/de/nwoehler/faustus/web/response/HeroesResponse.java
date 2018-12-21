package de.nwoehler.faustus.web.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroesResponse {

    private List<HeroResponse> heroes;
}
