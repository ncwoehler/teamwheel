package de.nwoehler.faustus.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import de.nwoehler.faustus.domain.User;
import de.nwoehler.faustus.domain.UserRepository;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
@RequestMapping("/api")
public class IndexController {

	public static final String HELLO_TEXT = "Hello from Spring Boot Backend!";

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(path = "/hello")
	public @ResponseBody
	String sayHello() {
		log.info("GET called on /hello resource");
		return HELLO_TEXT;
	}

	@RequestMapping(path = "/user", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public @ResponseBody
	long addNewUser(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email) {
		User user = new User(firstName, lastName, email);
		userRepository.save(user);

		log.info(user.toString() + " successfully saved into DB");

		return user.getId();
	}

	@GetMapping(path = "/user/{id}")
	public @ResponseBody
	User getUserById(@PathVariable("id") long id) {
		return userRepository.findById(id).orElse(null);
	}

}
