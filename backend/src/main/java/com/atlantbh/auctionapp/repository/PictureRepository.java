package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Picture;
import com.atlantbh.auctionapp.response.BasicPictureResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {

    List<BasicPictureResponse> findAllByProductId(Long productId);
}
