package com.example.chathub;

import com.example.chathub.enums.ErrorCode;
import com.example.chathub.exception.ErrorResponse;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.ObjectMapper;

//@SpringBootTest
class ChathubApplicationTests {

	@Test
	void contextLoads() {
		ObjectMapper mapper = new ObjectMapper();
		var res = mapper.writeValueAsString(new ErrorResponse("something", ErrorCode.CONFLICT));

		System.out.println(res);
	}

}
