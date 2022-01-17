package com.atlantbh.auctionapp.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.util.NestedServletException;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CardControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void getCard() throws Exception {
        try {
            RequestBuilder request = MockMvcRequestBuilders
                    .get("/cards/person/")
                    .accept(MediaType.APPLICATION_JSON);
            mvc.perform(request)
                    .andExpect(status().isUnauthorized())
                    .andReturn();
        } catch (NestedServletException e) {
            e.printStackTrace();
        }
    }

}
