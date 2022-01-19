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
public class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void getProduct() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/?id=1")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getRandomProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/random")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getNewProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/new")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getLastProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/last")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getAllProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/search")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getAllProductsSecondPage() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/search?page=1")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getProductsByCategory() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/category/fashion")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getProductsByCategoryAndSubcategory() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/category/?query=fashion&subcategory=pants")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getAllProductsAndFilterByPrice() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/search/price?query=&subcategory=&minPrice=0&maxPrice=400")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getCategoriesList() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/search/count")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getUserBiddedProducts() throws Exception {
        try {
            RequestBuilder request = MockMvcRequestBuilders
                    .get("/product/person/bids")
                    .accept(MediaType.APPLICATION_JSON);
            mvc.perform(request)
                    .andExpect(status().isUnauthorized())
                    .andReturn();
        } catch (NestedServletException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void getUserProducts() throws Exception {
        try {
            RequestBuilder request = MockMvcRequestBuilders
                    .get("/product/person/")
                    .accept(MediaType.APPLICATION_JSON);
            mvc.perform(request)
                    .andExpect(status().isUnauthorized())
                    .andReturn();
        } catch (NestedServletException e) {
            e.printStackTrace();
        }

    }

}
