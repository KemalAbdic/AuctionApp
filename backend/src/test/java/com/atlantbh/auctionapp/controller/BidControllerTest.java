package com.atlantbh.auctionapp.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BidControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void getBidsForProduct() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/bids/product/?id=1")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void postBidsForProduct() throws Exception {
        String json = "{" +
                "\"bidAmount\": \"888\", " +
                "\"productId\": \"1\"" +
                "}";
        mvc.perform(MockMvcRequestBuilders.post("/bids/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().is4xxClientError());
    }
}
