package de.nwoehler.teamwheel.web;

import com.atlassian.oai.validator.restassured.OpenApiValidationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.github.database.rider.core.DBUnitRule;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.spring.api.DBRider;
import de.nwoehler.teamwheel.Application;
import de.nwoehler.teamwheel.web.response.HeroesResponse;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

@DBRider
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = Application.class)
public class HeroesRestControllerTest {

    @Value("${local.server.port}")
    private int port;

    private final OpenApiValidationFilter validationFilter = new OpenApiValidationFilter("/static/api.yaml");

    @Autowired
    private DataSource dataSource;

    @Rule
    public DBUnitRule dbUnitRule = DBUnitRule.instance(() -> dataSource.getConnection());

    private JacksonTester<HeroesResponse> heroesResponse;

    @Before
    public void setup() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        JacksonTester.initFields(this, mapper);
    }

    @Test
    @DataSet(value = {"heroes.yml"}, cleanBefore = true)
    public void testGetJobsIsValid() throws Exception {
        HeroesResponse actualDTO =
                given()
                    .port(port)
                    .filter(validationFilter)
                .when()
                    .get("/api/heroes")
                .then()
                    .assertThat()
                    .statusCode(HttpStatus.OK.value())
                    .extract()
                    .as(HeroesResponse.class);

        HeroesResponse expectedDTO = heroesResponse.readObject("expected-get-heroes-response.json");
        assertThat(actualDTO).isEqualTo(expectedDTO);
    }
}
