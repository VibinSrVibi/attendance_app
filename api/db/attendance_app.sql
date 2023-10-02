-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2023 at 06:15 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `user_id` text NOT NULL,
  `password` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `user_id`, `password`, `status`) VALUES
(1, 'admin', 'admin@123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `in_datetime` datetime NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `user_id`, `date`, `in_datetime`, `status`) VALUES
(1, 6, '2023-10-01', '2023-10-01 09:16:19', 1),
(2, 5, '2023-10-03', '2023-10-01 09:16:19', 1),
(3, 6, '2023-11-21', '2023-09-21 09:16:19', 1),
(4, 1, '2023-10-01', '2023-10-01 18:56:41', 1),
(5, 9, '2023-10-01', '2023-10-01 19:38:28', 1),
(6, 10, '2023-10-02', '2023-10-02 11:29:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `monthly_fee`
--

CREATE TABLE `monthly_fee` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `monthly_fee`
--

INSERT INTO `monthly_fee` (`id`, `user_id`, `datetime`, `month`, `year`, `amount`, `status`) VALUES
(1, 2, '2023-10-02 16:18:09', 10, 2023, '0.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `created_datetime` datetime NOT NULL,
  `country_code` int(11) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `updated_datetime` datetime NOT NULL,
  `device_token` text NOT NULL,
  `username` text NOT NULL,
  `profile_pic` text NOT NULL,
  `dob` date NOT NULL,
  `login_status` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `created_datetime`, `country_code`, `mobile`, `user_type`, `updated_datetime`, `device_token`, `username`, `profile_pic`, `dob`, `login_status`, `email`, `status`) VALUES
(1, '2023-09-01 08:56:19', 91, '9488771769', 'user', '2023-10-02 11:27:56', '', 'vibin', '', '2023-10-06', 1, 'vibin@gmail.com', 0),
(2, '2023-10-01 09:03:14', 91, '2', 'user', '2023-10-01 09:03:14', '', '', '', '0000-00-00', 0, '', 0),
(3, '2023-10-01 09:08:03', 91, '2222222', 'user', '2023-10-01 09:08:03', '', '', '', '0000-00-00', 0, '', 0),
(4, '2023-10-01 09:11:03', 91, '123', 'user', '2023-10-01 09:11:03', '', '', '', '0000-00-00', 0, '', 0),
(5, '2023-10-01 09:13:04', 91, '7', 'user', '2023-10-01 09:13:04', '', '', '', '0000-00-00', 0, '', 0),
(6, '2023-11-01 09:13:59', 91, '8', 'user', '2023-09-01 09:14:33', '', 'vibin sr', '', '2023-10-01', 1, 'vibinsrvibi97@gmail.com', 0),
(7, '2023-10-01 18:58:42', 91, '4561', 'user', '2023-10-01 18:58:55', '', 'sd skfgsf', '', '2023-10-06', 1, 'nnfsd', 0),
(8, '2023-10-01 19:29:30', 91, '9677563859', 'user', '2023-10-01 19:38:00', '', 'airtela', '', '2023-10-07', 1, 'airtel@gmail.com', 0),
(9, '2023-10-01 19:36:51', 91, '12345', 'user', '2023-10-01 19:38:14', '', '12345', '', '2023-10-07', 1, '12345@gmail.com', 0),
(10, '2023-10-02 11:28:54', 91, '123456789', 'user', '2023-10-02 11:29:33', '', 'test', '', '2023-10-02', 1, 'test@gmail.com', 0),
(11, '2023-10-02 11:36:45', 91, '789456', 'user', '2023-10-02 11:37:05', '', '33', '', '2023-10-04', 1, '3@gmail.com', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monthly_fee`
--
ALTER TABLE `monthly_fee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `monthly_fee`
--
ALTER TABLE `monthly_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
