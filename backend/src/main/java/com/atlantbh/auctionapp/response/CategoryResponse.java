package com.atlantbh.auctionapp.response;

import org.springframework.lang.NonNull;

import java.util.Comparator;
import java.util.Objects;
import java.util.Set;

public class CategoryResponse implements Comparable<CategoryResponse> {

    private String name;
    private Integer count;
    private Set<CountResponse> subcategories;

    public CategoryResponse(String name, Integer count, Set<CountResponse> subcategories) {
        this.name = name;
        this.count = count;
        this.subcategories = subcategories;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Set<CountResponse> getSubcategories() {
        return subcategories;
    }

    public void setSubcategories(Set<CountResponse> subcategories) {
        this.subcategories = subcategories;
    }

    public void addSubcategory(CountResponse countResponse) {
        subcategories.add(countResponse);
    }

    @Override
    public int compareTo(@NonNull CategoryResponse categoryResponse) {
        return Comparator.comparing(CategoryResponse::getCount).reversed()
                .thenComparing(CategoryResponse::getName)
                .compare(this, categoryResponse);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CategoryResponse)) return false;
        CategoryResponse that = (CategoryResponse) o;
        return getName().equals(that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }
}
