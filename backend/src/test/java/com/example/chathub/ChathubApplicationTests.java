package com.example.chathub;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.exception.ErrorResponse;
import com.example.chathub.user.User;
import com.example.chathub.utils.Routes;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;
import tools.jackson.databind.ObjectMapper;

//@SpringBootTest
class ChathubApplicationTests {

	@Test
	void contextLoads() {
		ObjectMapper mapper = new ObjectMapper();
		var res = mapper.writeValueAsString(new ErrorResponse("something", ErrorCode.CONFLICT));

		System.out.println(res);
	}

	@Test
	void shouldNotFilter() {
		System.out.println(Routes.shouldNotFilter("/api/users"));
	}

	@Test
	void httpStatusTest() {
		System.out.println(HttpStatus.LOCKED.name());
	}

	@Test
	void assertTest() {
		User user = null;

		Assert.isNull(user, "User is Present");
	}

}
